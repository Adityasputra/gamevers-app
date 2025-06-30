import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Link,
  Button,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  resetLink: string;
}

export default function ResetPasswordEmail({
  resetLink,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password - GameVers</Preview>
      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          margin: "0",
          padding: "20px 0",
        }}
      >
        <Container
          style={{
            padding: "40px 32px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            maxWidth: "500px",
            margin: "0 auto",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header */}
          <Text
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "8px",
              marginTop: "0",
              color: "#111827",
              textAlign: "center",
            }}
          >
            Password Reset
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#6b7280",
              marginBottom: "32px",
              marginTop: "0",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            We received a request to reset your password for your GameverseHub
            account.
          </Text>

          {/* Main Content */}
          <Text
            style={{
              fontSize: "16px",
              color: "#374151",
              marginBottom: "24px",
              marginTop: "0",
              lineHeight: "1.6",
            }}
          >
            Click the button below to create a new password. This link will
            expire in 1 hour for security reasons.
          </Text>

          {/* Reset Button */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Button
              href={resetLink}
              style={{
                backgroundColor: "#7c3aed",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
                display: "inline-block",
                border: "none",
                cursor: "pointer",
              }}
            >
              Reset My Password
            </Button>
          </div>

          {/* Alternative Link */}
          <Text
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginBottom: "12px",
              marginTop: "0",
              lineHeight: "1.5",
            }}
          >
            If the button above doesn't work, copy and paste this link into your
            browser:
          </Text>

          <Text
            style={{
              fontSize: "14px",
              wordBreak: "break-all",
              marginBottom: "32px",
              marginTop: "0",
              padding: "12px",
              backgroundColor: "#f9fafb",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
            }}
          >
            <Link
              href={resetLink}
              style={{
                color: "#7c3aed",
                textDecoration: "none",
              }}
            >
              {resetLink}
            </Link>
          </Text>

          {/* Security Notice */}
          <Text
            style={{
              fontSize: "14px",
              color: "#9ca3af",
              marginBottom: "16px",
              marginTop: "0",
              lineHeight: "1.5",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "24px",
            }}
          >
            <strong>Security Notice:</strong> If you didn't request this
            password reset, please ignore this email. Your password will remain
            unchanged.
          </Text>

          <Text
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              marginBottom: "0",
              marginTop: "0",
              textAlign: "center",
            }}
          >
            © 2025 GameverseHub. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
