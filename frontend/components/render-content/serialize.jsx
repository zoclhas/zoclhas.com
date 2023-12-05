import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text } from "slate";
import Link from "next/link";
import { ImageLightbox } from "./image";

// eslint-disable-next-line no-use-before-define

const serialize = (children) =>
  children.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.underline) {
        text = (
          <span style={{ textDecoration: "underline" }} key={i}>
            {text}
          </span>
        );
      }

      if (node.strikethrough) {
        text = (
          <span style={{ textDecoration: "line-through" }} key={i}>
            {text}
          </span>
        );
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "upload":
        if (node.value) {
          return <ImageLightbox key={i} node={node} />;
        } else {
          return null;
        }
      case "h1":
        return <h1 key={i}>{serialize(node.children)}</h1>;
      case "h2":
        return (
          <h2
            key={i}
            id={String(node.children[0].text)
              .toLowerCase()
              .split(" ")
              .join("-")}
          >
            {serialize(node.children)}
          </h2>
        );
      case "h3":
        return <h3 key={i}>{serialize(node.children)}</h3>;
      case "h4":
        return <h4 key={i}>{serialize(node.children)}</h4>;
      case "h5":
        return <h5 key={i}>{serialize(node.children)}</h5>;
      case "h6":
        return <h6 key={i}>{serialize(node.children)}</h6>;
      case "blockquote":
        return <blockquote key={i}>{serialize(node.children)}</blockquote>;
      case "ul":
        return <ul key={i}>{serialize(node.children)}</ul>;
      case "ol":
        return <ol key={i}>{serialize(node.children)}</ol>;
      case "li":
        return <li key={i}>{serialize(node.children)}</li>;
      case "link":
        if (node.fields && node.fields.rel) {
          return (
            <Link
              href={escapeHTML(node.url)}
              key={i}
              target="_blank"
              rel={node.fields.rel.join(" ")}
              className="underline"
            >
              {serialize(node.children)}
            </Link>
          );
        }

        const target = !node.newTab ? undefined : "_blank";

        return (
          <Link
            href={escapeHTML(node.url)}
            key={i}
            target={target}
            className="underline"
          >
            {serialize(node.children)}
          </Link>
        );

      default:
        return <p key={i}>{serialize(node.children)}</p>;
    }
  });

export default serialize;
