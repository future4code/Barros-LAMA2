import {app} from "./app";
import { bandRouter } from "./routes/BandRouter";
import { showRouter } from "./routes/ShowRouter";
import { userRouter } from "./routes/UserRouter";

app.use("/user",userRouter);

app.use("/band",bandRouter);

app.use("/show",showRouter);