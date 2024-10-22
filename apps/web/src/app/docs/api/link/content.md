# Link

## Hooks

```ts
type LinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

declare function useLink(href: string): LinkProps;
```
