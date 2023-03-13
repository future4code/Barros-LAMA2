import {app} from "./app";
import { userRouter } from "./router/UserRouter";

app.use("/user",userRouter);