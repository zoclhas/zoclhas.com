import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  render,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  slug: string;
  title: string;
  subtitle: string;
  email: string;
  // @ts-ignore
  id: string;
}

export const Email = ({ slug, title, subtitle, email, id }: EmailProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>{title}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                p: "#2c2f41",
                s: "#8e94ab",
              },
            },
          },
        }}
      >
        <Body className="bg-p text-s mx-auto my-auto py-8 font-sans">
          <Container className="mx-[calc(auto+1rem)] my-[40px] max-w-[465px] overflow-hidden rounded-2xl">
            <Section>
              <Link href="https://zoclhas.com">
                <Img
                  src="https://i.zaurastudios.com/zauranet-b23dbb97e64f49a3b00c51e841a35fbe.webp"
                  alt="zoclhas.com banner image"
                  className="max-w-[456px]"
                />
              </Link>
            </Section>

            <Section className="mt-8 pt-2">
              <Text className="text-base">
                <span className="text-lg">
                  Hello,{" "}
                  <Link
                    className="text-s font-medium underline"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </Link>
                  ! <br />
                </span>
                I&apos;ve just released a new piece of writing! You can read it
                right here:
              </Text>
            </Section>

            <Section>
              <Link
                href={`https://zoclhas.com/writings/${slug}`}
                className="bg-s/10 hover:bg-s/20 text-s block rounded-2xl p-4"
              >
                <Heading className="!my-0 text-2xl">{title}</Heading>
                <Text className="!my-0">{subtitle}</Text>
              </Link>
            </Section>

            <Section className="mt-8">
              <Text className="text-center text-sm">
                If you'd like to stop receiving updates, then click{" "}
                <Link
                  href={`https://zoclhas.com/unsub?uid=${id}`}
                  className="text-s underline"
                >
                  here
                </Link>
                &nbsp;to unsubscribe from future updates.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const EmailHtml = ({ slug, title, subtitle, email, id }: EmailProps) =>
  render(
    <Email
      slug={slug}
      title={title}
      subtitle={subtitle}
      email={email}
      id={id}
    />,
  );
