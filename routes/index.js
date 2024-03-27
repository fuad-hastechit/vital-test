import combineRouters from "@utils/combineRouters";

import planRouter from "./planRouter";
import snippetsRouter from "./snippetsRouter";
import shopMetadataRouter from "./shopMetadataRouter";

const router = combineRouters(planRouter, snippetsRouter, shopMetadataRouter);

export default router;
