import { serve } from "./application/serve.js";

const port = process.env.PORT || 3000;

serve.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});