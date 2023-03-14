import {app} from "./app";
import { bandRouter } from "./router/BandRouter";
import { userRouter } from "./router/UserRouter";

app.use("/user",userRouter);

app.use("/band",bandRouter);