import { observer } from 'mobx-react-lite';
import Calendar from 'react-calendar';
import { Header, Menu, Icon } from 'semantic-ui-react';
import { useStore } from '@src/app/stores/store';
import { CategoryIcons } from '@src/app/common/enums/categories';
import { theme } from "@src/app/common/colors/theme";

export default observer(function ActivityFilters() {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();

  const categoryIconKeys = Object.keys(CategoryIcons) as (keyof typeof CategoryIcons)[];

  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached content="Filters" style={{ color: theme.colors.primary }} />
        <Menu.Item
          content="All Activities"
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
      </Menu>

      {/* Separate Menu for categories */}
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached content="Categories" style={{ color: theme.colors.primary }} />

        {/* Iterating through the category icons */}
        {categoryIconKeys.map((categoryIconKey) => (
          <Menu.Item
            key={categoryIconKey}
            content={
              <>
                <Icon name={CategoryIcons[categoryIconKey]} style={{opacity: "30%"}}/>
                {categoryIconKey.charAt(0).toUpperCase() + categoryIconKey.slice(1)}
              </>
            }
            active={predicate.has(categoryIconKey)}
            onClick={() => setPredicate(categoryIconKey, "true")}
          />
        ))}
      </Menu>

      <Header />
      <Calendar onChange={(date: any) => setPredicate("startDate", date as Date)} />
    </>
  );
});
