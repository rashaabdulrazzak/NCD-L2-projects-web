import React from "react";
import { Container } from "react-bootstrap";

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function CallToAction() {
  const shareUrl = "https://projects-web.herokuapp.com/";
  const title = "Let us support";
  return (
    <Container fluid className="calltoaction font-link" data-aos="zoom-in">
      <div className="text-center">
        <h3>Do You Like Our Idea </h3>
        <p> Let us share it with friends </p>
        <div className="social-box">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={42} round={true} url={shareUrl} title={title} />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={42} round={true} url={shareUrl} title={title} />
          </TwitterShareButton>
          <TelegramShareButton url={shareUrl}>
            <TelegramIcon size={42} round={true} url={shareUrl} title={title} />
          </TelegramShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={42} round={true} url={shareUrl} title={title} />
          </WhatsappShareButton>
        </div>
      </div>
    </Container>
  );
}
