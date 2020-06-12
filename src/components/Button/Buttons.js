import { ReactComponent as EmailSvg } from "../../svgs/EmailIcon.svg";
import withIcon from "../withHocs/withIcon";
import { BasicButton } from "./BasicButton";

export const EmailButton = withIcon( BasicButton,
  EmailSvg,
  { iconLeft: "20%", iconTop: "50%" }
);