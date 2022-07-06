const { styled, Button } = require("@mui/material");

/**
 * Customized MUI Button with our link button design.
 *
 * Requires usage of 'variant='text'' in HTML attribute when utilizing.
 *
 * @type {StyledComponent<PropsOf<((props: ({href: string} & OverrideProps<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<ButtonClasses>, color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>, disabled?: boolean, disableElevation?: boolean, disableFocusRipple?: boolean, endIcon?: React.ReactNode, fullWidth?: boolean, href?: string, size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsSizeOverrides>, startIcon?: React.ReactNode, sx?: SxProps<Theme>, variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>}, defaultComponent: "button"}>>, "a">)) => JSX.Element) & OverridableComponent<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<ButtonClasses>, color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>, disabled?: boolean, disableElevation?: boolean, disableFocusRipple?: boolean, endIcon?: React.ReactNode, fullWidth?: boolean, href?: string, size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsSizeOverrides>, startIcon?: React.ReactNode, sx?: SxProps<Theme>, variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>}, defaultComponent: "button"}>>>> & MUIStyledCommonProps<Theme>, {}, {}>}
 */
export const LinkButton = styled(Button)(({ theme }) => ({
  color: "#222831",
  width: ["max-content"],
  backgroundColor: "#FFFFFF",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 20,
  textTransform: ["none"],
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#FFFFFF",
    color: "#393E46",
  },
}));
