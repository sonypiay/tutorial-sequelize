import { serve } from "./application/app.js";
import { logger } from "./application/logger.js";

const port = process.env.PORT || 3000;

serve.listen(port, () => {
    const message = `Server is running on port ${port}`;
    
    console.info(message);
    logger.info(message);
});