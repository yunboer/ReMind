import { configureStore } from "@reduxjs/toolkit";
import renderRedecer from "./modules/render";

export default configureStore({
    reducer:{
        render: renderRedecer,
    }
})