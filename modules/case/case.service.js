import Case from "./case.model.js";
import { imagekit } from "../../config/imageKit.config.js";

// Create Case
export const createCase = async (data) => {
    return await Case.create(data);
};

// Get All Cases
export const getCases = async () => {
    return await Case.find().sort({ createdAt: -1 });
};

// Update Case
export const updateCase = async (id, data) => {
    return await Case.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
};

// Delete Case
export const deleteCase = async (id) => {
    return await Case.findByIdAndDelete(id);
};


export const deleteFile = async (
    caseId,
    fileId
) => {

    // ImageKit se delete
    await imagekit.deleteFile(
        fileId
    );

    // MongoDB se remove
    const updatedCase =
        await Case.findByIdAndUpdate(
            caseId,
            {
                $pull: {
                    files: {
                        fileId,
                    },
                },
            },
            { new: true }
        );

    return updatedCase;
};
// Upload File
export const uploadFile = async (
    caseId,
    file
) => {

    const result =
        await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: `/cases/${caseId}`,
        });

    const updatedCase =
        await Case.findByIdAndUpdate(
            caseId,
            {
                $push: {
                    files: {
                        fileName: result.name,
                        fileUrl: result.url,
                        fileId: result.fileId,
                    },
                },
            },
            { new: true }
        );

    return updatedCase;
};