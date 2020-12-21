"use strict";

const { cloudinary } = require("../utils/cloudinary");
const db = require("../db/index");

async function getCloudinaryPublicIds() {
    const { resources } = await cloudinary
                                    .search
                                    .expression("folder:art-zen-app")
                                    .execute();
    const publicIds = resources.map(file => file.public_id);
    
    return publicIds;
}

(async function populateDb() {
    const artworkImgPublicIds = await getCloudinaryPublicIds();

})();
