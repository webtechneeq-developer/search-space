import Overview from "./Overview";
import Details from "./Details";
import MapLocation from "./MapLocation";
import ContactSeller from "./ContactSeller";
import PropertyDescription from "./PropertyDescription";
import PropertyFeatures from "./PropertyFeatures";

export default function PropertyContentDetails({ propertyItem }) {
  return (
    <section className="flat-section-v3 flat-property-detail">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="single-property-element">
              <PropertyDescription propertyItem={propertyItem} />
            </div>
            <div className="single-property-element">
              <h4 className="title-mb">Overview</h4>
              <Overview propertyItem={propertyItem} />
            </div>
            <div className="single-property-element">
              <h4 className="title-mb">Details</h4>
              <Details propertyItem={propertyItem} />
            </div>
            <div className="single-property-element">
              <h4 className="title-mb">Amenities</h4>
              <PropertyFeatures propertyItem={propertyItem} />
            </div>
            <div className="single-property-element">
              <h4 className="title-mb">Map Location</h4>
              <MapLocation propertyItem={propertyItem} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="single-sidebar fixed-sidebar">
              <div className="widget-box single-property-contact">
                <h4 className="title-mb">Speak To Our Experts</h4>
                <ContactSeller />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
