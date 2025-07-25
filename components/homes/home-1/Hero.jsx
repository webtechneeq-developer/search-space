import FilterTab from "@/components/common/FilterTab";
import WordEffect1 from "@/components/common/WordEffect1";

export default function Hero() {
  return (
    <section className="flat-slider home-1">
      <div className="container relative">
        <div className="row">
          <div className="col-lg-12">
            <div className="slider-content">
              <div className="heading text-center">
                <div className="title-large text-white animationtext slide">
                  Find Your Ideal{" "}
                  <WordEffect1 string={["Coworking Space", "Coworking Office"]} />
                </div>
                <p
                  className="subtitle text-white body-2 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  Affordable Co-working spaces in the Location of your choice
                </p>
              </div>
              <FilterTab />
            </div>
          </div>
        </div>
      </div>
      <div className="overlay" />
    </section>
  );
}
