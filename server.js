import { server, Port } from "./index.js";
import connectDatabase from "./src/config/mongoose.config.js";


server.listen(Port, () => {
    console.log(`server is on http://localhost:${Port}`);
    connectDatabase();
})


