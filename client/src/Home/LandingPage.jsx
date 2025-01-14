import React, { useEffect, useState } from "react";
import LandingImg1 from "../Assets/LandingPageImages/GERNERIC RUNNER.jpg";
import LandingImg2 from "../Assets/LandingPageImages/shellshockedsoldeir.png";
import { useForm } from "react-hook-form";

const landingImages = [LandingImg1, LandingImg2];

export default function LandingPage() {
  const [landingImage, setLandingImage] = useState(LandingImg1);
  const [fryFactor, setFryFactor] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      distance: "5.0",
      pace: "05:00",
    },
  });
  const watchFields = watch(["distance", "pace"]);

  useEffect(() => {
    const imageIndex = Math.floor(watchFields[0]) + 1;
    
    if (imageIndex >= 0 && imageIndex <= landingImages.length) {
      setLandingImage(landingImages[imageIndex - 1]);
    } else {
      setLandingImage(LandingImg1);
    }
  }, [watchFields]);

  const submitForm = (formData) => {
    console.log(formData);
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row w-full justify-between gap-10 h-fit">
      <div className="flex flex-col gap-5 max-w-[600px]">
        <strong className="text-[8cqw] leading-[90%]">
          Basically, I will run for you
        </strong>
        <p className="flex-1">
          Strava Run is your ultimate activity tracker, helping you log,
          analyze, and share your running achievements.
        </p>
        <form onSubmit={handleSubmit(submitForm)} className="flex gap-5">
          <div className="flex flex-col">
            <span>Distance in km</span>

            <input
              {...register("distance")}
              type="number"
              step={0.1}
              min={1}
              max={25}
            />
          </div>
          <div className="flex flex-col">
            <span>Pace per km</span>
            <input {...register("pace")} type="time" min="03:00" max="10:00" />
          </div>
          <button type="submit" className="bg-orange-500 text-gray-50">
            Run fucker
          </button>
        </form>
      </div>
      <div className="max-h-[200px] sm:max-h-[400px] aspect-[3/4]">
        <img
          src={landingImage}
          alt=""
          className="h-full w-full object-cover rounded-sm"
        />
      </div>
    </div>
  );
}
