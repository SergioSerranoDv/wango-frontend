import React from "react";
import { InfoContainer } from "../styles/FormStyles";
import { DetailsSign, DetailsItem, SubLabel } from "../styles/FormStyles";

interface SignBoardProps {
  type: string | undefined;
}
export const SignBoardWithVariablesToCalculateWaterFootprint: React.FC<SignBoardProps> = ({
  type,
}) => {
  return (
    <InfoContainer $custom1 typeColor={type === "grey" ? "#FB9E0B" : undefined}>
      <br />
      <DetailsSign $custom4>
        R = <DetailsItem> Rendimiento del cultivo (Ton/día).</DetailsItem>
      </DetailsSign>

      <DetailsSign $custom3>
        Kc = <DetailsItem> Coeficiente del cultivo.</DetailsItem>
      </DetailsSign>

      {type === "grey" && (
        <DetailsSign $custom3>
          C<SubLabel>max</SubLabel>=
          <DetailsItem> Cantidad máxima permitida de químico.</DetailsItem>
        </DetailsSign>
      )}
      {type === "grey" && (
        <DetailsSign $custom3>
          C<SubLabel>nat</SubLabel>=
          <DetailsItem> Cantidad natural del químico en el agua.</DetailsItem>
        </DetailsSign>
      )}

      {(type === "blue" || type === "green") && (
        <DetailsSign $custom3>
          ETo = <DetailsItem>Evapotranspiración de referencia (mm/día).</DetailsItem>
        </DetailsSign>
      )}

      <DetailsSign $custom3>
        ETc = <DetailsItem>Evapotranspiración real del cultivo (mm/día).</DetailsItem>
      </DetailsSign>

      {type === "grey" && (
        <DetailsSign $custom3>
          α = <DetailsItem>Fracción de lixiviación-escorrentía superficial.</DetailsItem>
        </DetailsSign>
      )}

      {type === "grey" && (
        <DetailsSign $custom3>
          AR = <DetailsItem>Cant. aplicada de productos químicos (Kg/Ha).</DetailsItem>
        </DetailsSign>
      )}

      {type === "blue" && (
        <DetailsSign $custom3>
          Ir = <DetailsItem>Agua de riego basada en evapotranspiración (mm/día).</DetailsItem>
        </DetailsSign>
      )}
    </InfoContainer>
  );
};
