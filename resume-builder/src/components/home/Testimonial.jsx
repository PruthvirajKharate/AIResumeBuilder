import React from "react";
import Title from "./Title";
import { BookUser } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  return (
    <div
      id="testimonials"
      className="flex flex-col items-center my-10 scroll-my-12"
    >
      <div className="flex items-center gap-2 w-45 m-auto text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-6 py-1.5">
        <BookUser className="size-4.5 stroke-green-600" />
        <span>Testimonials</span>
      </div>
      <Title
        title={"Don't just take our words"}
        description={
          "Here what our users say about us. We are always looking for ways to improve. If you have positive experience with us, leave a review."
        }
      />
      <TestimonialCard />
    </div>
  );
};

export default Testimonial;
