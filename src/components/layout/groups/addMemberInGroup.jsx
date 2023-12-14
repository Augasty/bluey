/* eslint-disable react/prop-types */
import { doc, getDoc, updateDoc } from "firebase/firestore";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { useGroupAndChatToggleContext } from "../navbar/GroupAndChatToggleContext";

const AddMemberInGroup = () => {

  const { currentGroup } = useGroupAndChatToggleContext();
  const history = useNavigate();

  if (!currentGroup) {
    history("/");
  }

  const [userMail, setuserMail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userMail);

    const userRef = doc(db, "users", userMail);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists() && currentGroup) {
      // console.log("we can add it, and are adding it", currentGroup);
      const [groupId, groupName] = currentGroup



      const userDocRef = doc(db, "users", userMail);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();
      
      //  if currentGroup is an not an empty array 
      if (!userData.currentGroup || userData.currentGroup.length === 0) {

        // updating that users db
        await updateDoc(userDocRef, {
          currentGroup: [groupId, groupName],
          [`groups.${groupId}`]: groupName,
        });
      } else {
        await updateDoc(userDocRef, {
          [`groups.${groupId}`]: groupName,
        });
      }

      // updating in the groups db
      const groupDocRef = doc(db, "groups", groupId);
      const groupDocSnap = await getDoc(groupDocRef);

      const groupCurrdata = groupDocSnap.data();
      const existingMails = [...groupCurrdata.memberEmails];

      if (existingMails.includes(userMail)){
        console.warn('user already there')
        return
      }
      await updateDoc(groupDocRef, {
        memberEmails: [...groupCurrdata.memberEmails, userMail],
      });

      history("/");
    } else {
      console.log("nopes");
    }
  };

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="title">Add member</label>
          <input
            type="text"
            id="name"
            value={userMail}
            onChange={(e) => setuserMail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <button className="btn submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberInGroup;
