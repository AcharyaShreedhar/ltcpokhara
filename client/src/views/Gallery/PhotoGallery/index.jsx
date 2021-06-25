import React, { Component } from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import ScrollAnimation from "react-animate-on-scroll";

const imagelist = [
  {
    name: "पशु प्रजनन् तथा कृत्रिम गर्भाधान हाते पुस्तिका",
    src: "/images/image1.jpg",
  },
  {
    name: "व्यवसायिक गाई भैसीपालन हातेपुस्तिका",
    src: "/images/image2.jpg",
  },
  {
    name: "व्यवसायिक गाई भैसीपालन हातेपुस्तिका",
    src: "/images/image3.jpg",
  },
  {
    name: "व्यवसायिक गाई भैसीपालन हातेपुस्तिका",
    src: "/images/image4.jpg",
  },
  {
    name: "पशु प्रजनन् तथा कृत्रिम गर्भाधान हाते पुस्तिका",
    src: "/images/image1.jpg",
  },
  {
    name: "व्यवसायिक गाई भैसीपालन हातेपुस्तिका",
    src: "/images/image2.jpg",
  },
  {
    name: "व्यवसायिक गाई भैसीपालन हातेपुस्तिका",
    src: "/images/image3.jpg",
  },
  {
    name: "व्यवसायिक गाई भैसीपालन हातेपुस्तिका",
    src: "/images/image4.jpg",
  },
];

class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className="w-100 content">
        <div className="titlebar">फोटो ग्यालरी</div>
        <div className="d-flex card my-1">
          <Container>
            <Row>
              {imagelist.map((image, index) => (
                <Col xs={6} md={4} className="py-2">
                  <ScrollAnimation
                    animateIn="zoomIn"
                    animateOnce={true}
                    duration={1}
                    initiallyVisible={true}
                  >
                    <Image className="rounded" src={image.src} alt="" fluid />
                  </ScrollAnimation>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default PhotoGallery;
