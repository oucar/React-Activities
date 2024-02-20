import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Category } from "../../../app/common/enums/categories";

export default observer(function ActivityFilters() {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();

  const categories = Object.values(Category);

  return (
    <>
      {/* https://react.semantic-ui.com/collections/menu/ */}
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          content="All Activites"
          active={predicate.has("all")}
          onClick={() => setPredicate("all", "true")}
        />
        <Menu.Item
          content="I'm going"
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
        />
        <Menu.Item
          content="I'm hosting"
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
        />
        {/* Iterating thru the categories */}
        {categories.map((category) => (
        <Menu.Item
          key={category}
          content={category.charAt(0).toUpperCase() + category.slice(1)}
          active={predicate.has(category)}
          onClick={() => setPredicate(category, "true")}
        />
      ))}
      </Menu>
      <Header />
      <Calendar
        onChange={(date: any) => setPredicate("startDate", date as Date)}
      />
    </>
  );
});
