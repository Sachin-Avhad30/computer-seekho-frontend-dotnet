import PlacementGrid from "./PlacementGrid";
import dbdaPlacements from "../../data/dbdaplacements.js";
import dacPlacements  from "../../data/dacplacements.js";

function BatchWisePlacement() {
  return (
    <>
      <PlacementGrid heading="PG-DBDA Placement" data={dbdaPlacements} />

      <PlacementGrid heading="PG-DAC Placement" data={dacPlacements} />
    </>
  );
}

export default BatchWisePlacement;
