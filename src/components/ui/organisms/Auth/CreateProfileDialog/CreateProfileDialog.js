import Button from "../../../atoms/Button/Button";
import styles from "./CreateProfileDialog.module.css";
import { useState, useEffect, memo } from "react";
import Modal from "../../Modal/Modal";
import P from "../../../atoms/P/P";
import { Link } from "react-router-dom";

const CreateProfileDialog = ({open, closeModal, redirectTo = null, message = null}) => 
{
  return (
    <div className={styles.CreateProfileDialogContainer}>

      <Modal open={open} closeModal={closeModal}>
        <div className={styles.CreateProfileDialog}>
          <div className={styles.heading}>
            <P> {message ? message : "You have to create your profile before you can proceed"}</P>
          </div>
          <Link to={redirectTo ? redirectTo : "/create-profile-instruction"}><Button>Create Profile</Button></Link>
        </div>
      </Modal>

    </div>
  );
};

export default memo(CreateProfileDialog);
