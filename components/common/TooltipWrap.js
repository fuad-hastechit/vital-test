import { Tooltip } from "@shopify/polaris";

export default function TooltipWrap(props) {
  return props.active ? (
    <Tooltip {...props} active={false}>
      {props.children}
    </Tooltip>
  ) : (
    props.children
  );
}
