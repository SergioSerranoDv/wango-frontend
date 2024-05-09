import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { FormContainer, SignBoard } from "../styles/FormStyles";

export const WFFull: React.FC = () => {
  return (
    <>
      <MainLayout>
        <FormContainer>
          <SignBoard $custom4>Proximamente</SignBoard>
        </FormContainer>
      </MainLayout>
    </>
  );
};
