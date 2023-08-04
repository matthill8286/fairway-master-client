Defines how to use the Grid System

```jsx
import GridContainer from "./GridContainer";
import GridItem from "./GridItem";
import MediaQuery from "./MediaQuery";
import Offset from "./Offset";
import Order from "./Order";

const App = () => {
  return (
    <GridContainer
      columnSizes="repeat(12, 1fr)"
      gap="1em"
      alignItems="center"
      justifyContent="center"
    >
      <GridItem span={6}>
        <h2>Title</h2>
        <p>Content</p>
      </GridItem>
      <GridItem span={6}>
        <img src="image.jpg" alt="testing the layout" />
      </GridItem>
      <GridItem span={12} tablet={6} mobile={12}>
        <p>Full-width content on mobile</p>
      </GridItem>
      <Order order={2}>
        <GridItem span={6}>Column 1</GridItem>
        <GridItem span={6}>Column 2</GridItem>
      </Order>
      <Offset offset={3}>
        <GridItem span={6}>Column 1</GridItem>
      </Offset>
      <MediaQuery query="desktop">
        <GridItem span={4}>Column 1</GridItem>
        <GridItem span={4}>Column 2</GridItem>
        <GridItem span={4}>Column 3</GridItem>
      </MediaQuery>
      <MediaQuery query="tablet">
        <GridItem span={6}>Column 1</GridItem>
        <GridItem span={6}>Column 2</GridItem>
      </MediaQuery>
      <MediaQuery query="mobile">
        <GridItem span={12}>Column 1</GridItem>
        <GridItem span={12}>Column 2</GridItem>
      </MediaQuery>
    </GridContainer>
  );
};

export default App;
```