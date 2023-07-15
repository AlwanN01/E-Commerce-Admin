type Colors = "red" | "green" | "blue";
const favoriteColors = {
    "red": "yes",
    "green": false,
    "blue": "kinda",
} satisfies Record<Colors, unknown>;
const g: boolean = favoriteColors.green;

interface RGB {
  red: number;
  green: number;
  blue: number;
}
interface HSV {
  hue: number;
  saturation: number;
  value: number;
}
function setColor(color: RGB | HSV) {
  if ("hue" in color) {
      // 'color' now has the type HSV
  }
  // ...
}interface Context {
  packageJSON: unknown;
}
function tryGetPackageName(context: Context): string | undefined {
  const packageJSON = context.packageJSON;
  // Check to see if we have an object.
  if (packageJSON && typeof packageJSON === "object") {
      // Check to see if it has a string name property.
      if ("name" in packageJSON && typeof packageJSON.name === "string") {
          // Just works!
          return packageJSON.name;
      }
  }
  return undefined;
}
const x = <Foo a:b="hello" />;
const y = <Foo a : b="hello" />;
interface FooProps {
    "a:b": string;
}
function Foo(props: FooProps) {
    return <div>{props["a:b"]}</div>;
}
type TypeA = {
  name: string;
};

type TypeB = {
  level: number;
};

type TypeC = {
  loading: boolean;
} & (TypeA | TypeB);
const obj: Prettify<React.ComponentProps<'div'>> = {
  
};