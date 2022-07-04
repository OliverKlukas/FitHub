const { styled, Button } = require("@mui/material");

/**
 * Customized MUI Button with our cancel button design.
 *
 * Requires usage of 'variant='contained'' in HTML attribute when utilizing.
 *
 * @type {StyledComponent<PropsOf<((props: ({href: string} & OverrideProps<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<ButtonClasses>, color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>, disabled?: boolean, disableElevation?: boolean, disableFocusRipple?: boolean, endIcon?: React.ReactNode, fullWidth?: boolean, href?: string, size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsSizeOverrides>, startIcon?: React.ReactNode, sx?: SxProps<Theme>, variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>}, defaultComponent: "button"}>>, "a">)) => JSX.Element) & OverridableComponent<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<ButtonClasses>, color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>, disabled?: boolean, disableElevation?: boolean, disableFocusRipple?: boolean, endIcon?: React.ReactNode, fullWidth?: boolean, href?: string, size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsSizeOverrides>, startIcon?: React.ReactNode, sx?: SxProps<Theme>, variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>}, defaultComponent: "button"}>>>> & MUIStyledCommonProps<Theme>, {}, {}>}
 */
export const CancelButton = styled(Button)(({ theme }) => ({
  color: "#222831",
  width: ["max-content"],
  backgroundColor: "#EEEEEE",
  border: "1px solid",
  borderColor: "#EEEEEE",
  fontStyle: "normal",
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 16,
  textTransform: ["none"],
  textAlign: "center",
  "&:hover": {
    borderColor: "#393E46",
    backgroundColor: "#EEEEEE",
  },
}));
