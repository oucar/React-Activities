import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "@src/app/stores/store";
import { theme } from "@src/app/common/colors/theme";

export default observer(function ServerError() {
    const {commonStore} = useStore();
    return (
        <Container>
            <Header as='h1' content='Server Error' />
            <Header sub as='h5' content={commonStore.error?.message} style={{ color: theme.colors.primary }}/>
            {commonStore.error?.details && (
                <Segment>
                    <Header as='h4' content='Stack trace' style={{ color: theme.colors.primary }} />
                    <code style={{marginTop: '10px'}}>{commonStore.error.details}</code>
                </Segment>
            )}
        </Container>
    )
})