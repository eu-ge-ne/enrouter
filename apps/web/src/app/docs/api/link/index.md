# Link

## Hooks

```ts
interface UseLinkPropsParams {
  href: string;
}

type LinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

declare function useLinkProps({ href }: UseLinkPropsParams): LinkProps;

interface UseActiveLinkPropsParams {
  href: string;
  loose?: boolean;
  className: (isActive: boolean) => string;
}

type ActiveLinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "href" | "onClick"
>;

declare function useActiveLinkProps({
  href,
  loose,
  className,
}: UseActiveLinkPropsParams): ActiveLinkProps;
```
