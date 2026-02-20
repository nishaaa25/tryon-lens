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

// Background gallery: images from assets/background by category (Studio, Indoor, Outdoor)
export type BackgroundCategory = "Studio" | "Indoor" | "Outdoor";

export type BackgroundGalleryItem = {
  id: number;
  name: string;
  category: BackgroundCategory;
  imageUrl: string;
};

export const backgroundGallery: BackgroundGalleryItem[] = [
  // Studio
  { id: 1, name: "Soft Pearl Studio", category: "Studio", imageUrl: "/assets/background/studio/17ab886562364fd671899d3334420f4224a8b676.png" },
  { id: 2, name: "Neutral Gray Studio", category: "Studio", imageUrl: "/assets/background/studio/31f332e5771c1a6ef91e3126ea6a564ec140525b.png" },
  { id: 3, name: "Bright White Studio", category: "Studio", imageUrl: "/assets/background/studio/42b697789d16838b9b5c54b58e2e20ed376196bb.png" },
  { id: 4, name: "Clean Frame Studio", category: "Studio", imageUrl: "/assets/background/studio/5069fbeb6891bf320a38662fa604444039269c83.png" },
  { id: 5, name: "Minimal Studio A", category: "Studio", imageUrl: "/assets/background/studio/5b46088724678289b4970100d8cf73f4892730d7.png" },
  { id: 6, name: "Elegant Studio", category: "Studio", imageUrl: "/assets/background/studio/928dce4502d4cf62a8619011c6d50946ec521932.png" },
  { id: 7, name: "Frame Studio Light", category: "Studio", imageUrl: "/assets/background/studio/9705c4287c9af15ca16f13c685639b25d80b1a1b.png" },
  { id: 8, name: "Frame Studio Soft", category: "Studio", imageUrl: "/assets/background/studio/9812085e839072347483c57a2fc99728601a216c.png" },
  { id: 9, name: "Studio Frame 334", category: "Studio", imageUrl: "/assets/background/studio/Frame 334 (1).png" },
  { id: 10, name: "Studio Frame 334 B", category: "Studio", imageUrl: "/assets/background/studio/Frame 334.png" },
  { id: 11, name: "Warm Studio", category: "Studio", imageUrl: "/assets/background/studio/b039768fc66460488c8c9d6ee33ba4e5ede42b29.png" },
  { id: 12, name: "Cool Tone Studio", category: "Studio", imageUrl: "/assets/background/studio/d3a53c9d125f4835eba8dc7353fac535fef918a7.png" },
  { id: 13, name: "Studio Backdrop", category: "Studio", imageUrl: "/assets/background/studio/d8be52dc4d8a43076cb8052ded996fb5a5a1cc0a.png" },
  { id: 14, name: "Natural Studio", category: "Studio", imageUrl: "/assets/background/studio/ebd212e121c6a8b787202dea1485cb40f4311cfa.png" },
  { id: 15, name: "Classic Studio", category: "Studio", imageUrl: "/assets/background/studio/f46d4acb2636b3d34e4fa6cbe7756124b37565c1.png" },
  // Indoor
  { id: 16, name: "Cozy Living", category: "Indoor", imageUrl: "/assets/background/indoor/0b86ed4ff1c8721fe64ef09f377461dc2d1415ee.png" },
  { id: 17, name: "Modern Indoor", category: "Indoor", imageUrl: "/assets/background/indoor/7808d65e1c017247385d8350c3ed3b3f918f56f2.png" },
  { id: 18, name: "Home Interior", category: "Indoor", imageUrl: "/assets/background/indoor/8d40b7d8a493f81ccbcccc5c13c1f4838697e26b.png" },
  { id: 19, name: "Warm Indoor", category: "Indoor", imageUrl: "/assets/background/indoor/a6b6e9b8db4d9ebcc49f7561dd332a3ea2c6ffe8.png" },
  { id: 20, name: "Indoor Space", category: "Indoor", imageUrl: "/assets/background/indoor/afea953504a78344502f8ad2fc82c267d9b017ca.png" },
  { id: 21, name: "Room View", category: "Indoor", imageUrl: "/assets/background/indoor/d6151e8ff8bcfec671741e5e637a06c19cbaaa60.png" },
  // Outdoor
  { id: 22, name: "Garden Path", category: "Outdoor", imageUrl: "/assets/background/outdoor/069179964d94ca450e8992430ec6200ee50349e3.png" },
  { id: 23, name: "Sky View", category: "Outdoor", imageUrl: "/assets/background/outdoor/26d6704d0893d64a545f6a0207edc835c93bf3fd.png" },
  { id: 24, name: "Nature Scene", category: "Outdoor", imageUrl: "/assets/background/outdoor/27256c1bec1960847208a88fda858f66086acb7e.png" },
  { id: 25, name: "Outdoor Light", category: "Outdoor", imageUrl: "/assets/background/outdoor/27e9795ae98f26f89363ee4241cd1004b855c8cb.png" },
  { id: 26, name: "Park View", category: "Outdoor", imageUrl: "/assets/background/outdoor/449213abd35a2b8d24f0a0f612bfceee767fb8d6.png" },
  { id: 27, name: "Horizon", category: "Outdoor", imageUrl: "/assets/background/outdoor/48ceca3bf021efd3ef57af38f9f03b25b7459ee3.png" },
  { id: 28, name: "Sunset Outdoor", category: "Outdoor", imageUrl: "/assets/background/outdoor/5f95701ebf971d0ffb4adda9be780d12e350ef09.png" },
  { id: 29, name: "Open Sky", category: "Outdoor", imageUrl: "/assets/background/outdoor/6d37dd2b55ffd25de8caf161d2c9afd7012e39be.png" },
  { id: 30, name: "Outdoor Scene", category: "Outdoor", imageUrl: "/assets/background/outdoor/715307fc8b74cefcc38fb4424d39dacb03099efa.png" },
  { id: 31, name: "Landscape", category: "Outdoor", imageUrl: "/assets/background/outdoor/735eb258359b640dd627314bb7aee65e3a1c2316.png" },
  { id: 32, name: "Meadow View", category: "Outdoor", imageUrl: "/assets/background/outdoor/8df464d9335e2d0baa89527108adf5ba15906528.png" },
  { id: 33, name: "Clear Day", category: "Outdoor", imageUrl: "/assets/background/outdoor/ad81c1a49364070f806656b3f892b48b5c989e48.png" },
  { id: 34, name: "Outdoor Breeze", category: "Outdoor", imageUrl: "/assets/background/outdoor/ba5543cfd9dd3c1dbf38964267822a413f02712b.png" },
  { id: 35, name: "Golden Hour", category: "Outdoor", imageUrl: "/assets/background/outdoor/e5c9789060689ee877872a771ed04e1a4120bd72.png" },
  { id: 36, name: "Cloudy Outdoor", category: "Outdoor", imageUrl: "/assets/background/outdoor/ee44074aa2c76affa0f976b169562b9239bf106e.png" },
];

export { modelPosesByModelId };