import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  } from "@react-email/components";

interface EmailTemplateProps {
  username: string
  otp: string
}

export default function EmailTemplate({ username, otp }: EmailTemplateProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font 
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont = {{
            url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
            format: 'truetype',
          }}
          fontStyle="normal"
          fontWeight={400}
          />
      </Head>
      <Preview>Whispr | Verification Code : {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h1">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Here&apos;s your verification code : <h2><b>{otp}</b></h2>
          </Text>
        </Row>
        <Row>
          <Text>
            Thank you for registering with <b>Whispr</b>. Please use the above registration code to verify your account.
          </Text>
        </Row>
        {/* <Button href="https://example.com">Verify</Button> */}
      </Section>
    </Html>
  );
}
