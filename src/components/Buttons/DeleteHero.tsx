import { Button } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { deleteHero } from "../../store/slices/HeroHoardSlice";
import { ConfirmationModal } from "../modals/Confirmation.modal";

export const DeleteHeroButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  if (id === undefined) return null;

  return (
    <>
      <Button
        sx={{
          borderRadius: 10,
          fontSize: "12px",
          mt: 2,
        }}
        color="error"
        variant="contained"
        onClick={() => setShowModal(true)}
      >
        Delete Hero
      </Button>

      <ConfirmationModal
        content="Do you wish to delete this Hero?"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          dispatch(deleteHero(id));
          navigate("/");
        }}
      />
    </>
  );
};
