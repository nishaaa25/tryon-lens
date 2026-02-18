// Pose images per model (from models-gallery). Each model has 5 poses: arms crossed, back-facing, hands on hips, left-facing side profile, right-facing side profile.
const modelPosesByModelId: Record<string, { poseName: string; viewType: string; imageUrl: string }[]> = {
    "model-1": [
        { poseName: "arms crossed in front", viewType: "waist-up view", imageUrl: "/assets/models-gallery/model-1/arms crossed in front_waist-up view.png" },
        { poseName: "back-facing, neutral stance", viewType: "full body view (from head to toe) (1)", imageUrl: "/assets/models-gallery/model-1/back-facing, neutral stance_full body view (from head to toe) (1).png" },
        { poseName: "hands on hips", viewType: "full body view (from head to toe) (2)", imageUrl: "/assets/models-gallery/model-1/hands on hips_full body view (from head to toe) (2).png" },
        { poseName: "left-facing, side profile", viewType: "waist-up view", imageUrl: "/assets/models-gallery/model-1/left-facing, side profile_waist-up view.png" },
        { poseName: "right-facing, side profile", viewType: "waist-up view", imageUrl: "/assets/models-gallery/model-1/right-facing, side profile_waist-up view.png" },
    ],
    "model-2": [
        { poseName: "arms crossed in front", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-2/arms crossed in front_full body view (from head to toe).png" },
        { poseName: "back-facing, neutral stance", viewType: "waist-up view", imageUrl: "/assets/models-gallery/model-2/back-facing, neutral stance_waist-up view.png" },
        { poseName: "hands on hips", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-2/hands on hips_full body view (from head to toe).png" },
        { poseName: "left-facing, side profile", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-2/left-facing, side profile_full body view (from head to toe).png" },
        { poseName: "right-facing, side profile", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-2/right-facing, side profile_full body view (from head to toe).png" },
    ],
    "model-3": [
        { poseName: "arms crossed in front", viewType: "full body view (from head to toe) (1)", imageUrl: "/assets/models-gallery/model-3/arms crossed in front_full body view (from head to toe) (1).png" },
        { poseName: "back-facing, neutral stance", viewType: "three-quarter view (above knees upward)", imageUrl: "/assets/models-gallery/model-3/back-facing, neutral stance_three-quarter view (above knees upward).png" },
        { poseName: "hands on hips", viewType: "full body view (from head to toe) (3)", imageUrl: "/assets/models-gallery/model-3/hands on hips_full body view (from head to toe) (3).png" },
        { poseName: "left-facing, side profile", viewType: "waist-up view (1)", imageUrl: "/assets/models-gallery/model-3/left-facing, side profile_waist-up view (1).png" },
        { poseName: "right-facing, side profile", viewType: "full body view (from head to toe) (2)", imageUrl: "/assets/models-gallery/model-3/right-facing, side profile_full body view (from head to toe) (2).png" },
    ],
    "model-4": [
        { poseName: "arms crossed in front", viewType: "three-quarter view (above knees upward)", imageUrl: "/assets/models-gallery/model-4/arms crossed in front_three-quarter view (above knees upward).png" },
        { poseName: "back-facing, neutral stance", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-4/back-facing, neutral stance_full body view (from head to toe).png" },
        { poseName: "hands on hips", viewType: "full body view (from head to toe) (1)", imageUrl: "/assets/models-gallery/model-4/hands on hips_full body view (from head to toe) (1).png" },
        { poseName: "left-facing, side profile", viewType: "three-quarter view (above knees upward)", imageUrl: "/assets/models-gallery/model-4/left-facing, side profile_three-quarter view (above knees upward).png" },
        { poseName: "right-facing, side profile", viewType: "full body view (from head to toe) (1)", imageUrl: "/assets/models-gallery/model-4/right-facing, side profile_full body view (from head to toe) (1).png" },
    ],
    "model-5": [
        { poseName: "arms crossed in front", viewType: "waist-up view", imageUrl: "/assets/models-gallery/model-5/arms crossed in front_waist-up view.png" },
        { poseName: "back-facing, neutral stance", viewType: "three-quarter view (above knees upward)", imageUrl: "/assets/models-gallery/model-5/back-facing, neutral stance_three-quarter view (above knees upward).png" },
        { poseName: "hands on hips", viewType: "full body view (from head to toe)  (2)", imageUrl: "/assets/models-gallery/model-5/hands on hips_full body view (from head to toe)  (2).png" },
        { poseName: "left-facing, side profile", viewType: "three-quarter view (above knees upward)", imageUrl: "/assets/models-gallery/model-5/left-facing, side profile_three-quarter view (above knees upward).png" },
        { poseName: "right-facing, side profile", viewType: "waist-up view", imageUrl: "/assets/models-gallery/model-5/right-facing, side profile_waist-up view.png" },
    ],
    "model-6": [
        { poseName: "arms crossed in front", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-6/arms crossed in front_full body view (from head to toe).png" },
        { poseName: "back-facing, neutral stance", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-6/back-facing, neutral stance_full body view (from head to toe).png" },
        { poseName: "hands on hips", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-6/hands on hips_full body view (from head to toe).png" },
        { poseName: "left-facing, side profile", viewType: "three-quarter view (above knees upward) (1)", imageUrl: "/assets/models-gallery/model-6/left-facing, side profile_three-quarter view (above knees upward) (1).png" },
        { poseName: "right-facing, side profile", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-6/right-facing, side profile_full body view (from head to toe).png" },
    ],
    "model-7": [
        { poseName: "arms crossed in front", viewType: "full body view (from head to toe) (1)", imageUrl: "/assets/models-gallery/model-7/arms crossed in front_full body view (from head to toe) (1).png" },
        { poseName: "back-facing, neutral stance", viewType: "full body view (from head to toe) (1)", imageUrl: "/assets/models-gallery/model-7/back-facing, neutral stance_full body view (from head to toe) (1).png" },
        { poseName: "hands on hips", viewType: "full body view (from head to toe) (1)", imageUrl: "/assets/models-gallery/model-7/hands on hips_full body view (from head to toe) (1).png" },
        { poseName: "left-facing, side profile", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-7/left-facing, side profile_full body view (from head to toe).png" },
        { poseName: "right-facing, side profile", viewType: "full body view (from head to toe) (1)", imageUrl: "/assets/models-gallery/model-7/right-facing, side profile_full body view (from head to toe) (1).png" },
    ],
    "model-8": [
        { poseName: "arms crossed in front", viewType: "full body view (from head to toe)  (1)", imageUrl: "/assets/models-gallery/model-8/arms crossed in front_full body view (from head to toe)  (1).png" },
        { poseName: "back-facing, neutral stance", viewType: "full body view (from head to toe)  (1)", imageUrl: "/assets/models-gallery/model-8/back-facing, neutral stance_full body view (from head to toe)  (1).png" },
        { poseName: "hands on hips", viewType: "full body view (from head to toe)  (1)", imageUrl: "/assets/models-gallery/model-8/hands on hips_full body view (from head to toe)  (1).png" },
        { poseName: "left-facing, side profile", viewType: "full body view (from head to toe)  (1)", imageUrl: "/assets/models-gallery/model-8/left-facing, side profile_full body view (from head to toe)  (1).png" },
        { poseName: "right-facing, side profile", viewType: "full body view (from head to toe)", imageUrl: "/assets/models-gallery/model-8/right-facing, side profile_full body view (from head to toe) .png" },
    ],
};

export const womenModels = [
    {
        "id": "model-8",
        "age-group": "young_adult",
        "ethnicity": "africa",
        "gender": "female",
        "body-type": "curvy",
        "frontImage": "/assets/models-gallery/model-8/image (1).png",
        "modelPoses": modelPosesByModelId["model-8"],
    },
    {
        "id": "model-5",
        "age-group": "adult",
        "ethnicity": "asian",
        "gender": "female",
        "body-type": "athletic",
        "frontImage": "/assets/models-gallery/model-5/image (2).png",
        "modelPoses": modelPosesByModelId["model-5"],
    },
    {
        "id": "model-6",
        "age-group": "mature",
        "ethnicity": "caucasian",
        "gender": "female",
        "body-type": "slim",
        "frontImage": "/assets/models-gallery/model-6/image (3).png",
        "modelPoses": modelPosesByModelId["model-6"],
    },
    {
        "id": "model-7",
        "age-group": "young_adult",
        "ethnicity": "latino",
        "gender": "female",
        "body-type": "slim",
        "frontImage": "/assets/models-gallery/model-7/image (4).png",
        "modelPoses": modelPosesByModelId["model-7"],
    }
]

export const menModels = [
    {
        "id": "model-2",
        "age-group": "young_adult",
        "ethnicity": "africa",
        "gender": "male",
        "body-type": "average",
        "frontImage": "/assets/models-gallery/model-2/image.png",
        "modelPoses": modelPosesByModelId["model-2"],
    },
    {
        "id": "model-4",
        "age-group": "adult",
        "ethnicity": "asian",
        "gender": "male",
        "body-type": "muscular",
        "frontImage": "/assets/models-gallery/model-4/image (1).png",
        "modelPoses": modelPosesByModelId["model-4"],
    },
    {
        "id": "model-3",
        "age-group": "mature",
        "ethnicity": "latino",
        "gender": "male",
        "body-type": "curvy",
        "frontImage": "/assets/models-gallery/model-3/image (3).png",
        "modelPoses": modelPosesByModelId["model-3"],
    },
    {
        "id": "model-1",
        "age-group": "young_adult",
        "ethnicity": "caucasian",
        "gender": "male",
        "body-type": "athletic",
        "frontImage": "/assets/models-gallery/model-1/image (2).png",
        "modelPoses": modelPosesByModelId["model-1"],
    }
];

export { modelPosesByModelId };