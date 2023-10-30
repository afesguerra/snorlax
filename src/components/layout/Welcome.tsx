import {
    Container,
    ContentLayout,
    Flashbar,
    Header,
    LineChart, Link,
    SpaceBetween,
    TextContent
} from "@cloudscape-design/components";
import React from "react";

const exampleChart = <LineChart
    hideFilter={true} // while solving bug
    series={[{
        title: "My Habit",
        type: "line",
        data: [
            {x: new Date(1600984800000), y: 58020},
            {x: new Date(1600985700000), y: 102402},
            {x: new Date(1600986600000), y: 104920},
            {x: new Date(1600987500000), y: 94031},
            {x: new Date(1600988400000), y: 125021},
            {x: new Date(1600989300000), y: 159219},
            {x: new Date(1600990200000), y: 193082},
            {x: new Date(1600991100000), y: 162592},
            {x: new Date(1600992000000), y: 274021},
            {x: new Date(1600992900000), y: 264286},
            {x: new Date(1600993800000), y: 289210},
            {x: new Date(1600994700000), y: 256362},
            {x: new Date(1600995600000), y: 257306},
            {x: new Date(1600996500000), y: 186776},
            {x: new Date(1600997400000), y: 294020},
            {x: new Date(1600998300000), y: 385975},
            {x: new Date(1600999200000), y: 486039},
            {x: new Date(1601000100000), y: 490447},
            {x: new Date(1601001000000), y: 361845},
            {x: new Date(1601001900000), y: 339058},
            {x: new Date(1601002800000), y: 298028},
            {x: new Date(1601003700000), y: 231902},
            {x: new Date(1601004600000), y: 224558},
            {x: new Date(1601005500000), y: 253901},
            {x: new Date(1601006400000), y: 102839},
            {x: new Date(1601007300000), y: 234943},
            {x: new Date(1601008200000), y: 204405},
            {x: new Date(1601009100000), y: 190391},
            {x: new Date(1601010000000), y: 183570},
            {x: new Date(1601010900000), y: 162592},
            {x: new Date(1601011800000), y: 148910},
            {x: new Date(1601012700000), y: 229492},
            {x: new Date(1601013600000), y: 293910}
        ]
    }]}
    height={300}
    xScaleType="time"
    xTitle="Time"
    yTitle="Score"
    xTickFormatter={value => value.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    })}
/>;

export const Welcome = () => (
    <ContentLayout header={<Header
        variant={"h1"}
        description={'Third Party website to graph Habitica tasks'}>Snorlax</Header>}>
        <SpaceBetween size={"m"} direction={"vertical"}>
            <Container
                header={<Header>Get started</Header>}>
                <SpaceBetween size={"m"} direction={"vertical"}>
                    <TextContent>
                        <p>
                            This website allows you to get a graph of the history of your Habitica tasks (currently only
                            habits are supported). With you UserID and API Token, it will retrieve your tasks and graph
                            them
                            in a line chart
                        </p>

                        <p>To get started, add your UserID and API token in the preferences section at the top right
                            corner.
                            You can get these credentials in <Link
                                external={true}
                                href={'https://habitica.com/user/settings/api'}>
                                Habitica's API settings
                            </Link>
                        </p>
                    </TextContent>
                    <Flashbar items={[{
                        id: "localStorageUse",
                        type: "warning",
                        dismissible: false,
                        content: "Credentials are stored in the browser's local storage for convenience and only used to call Habitica's API. Use at your own risk"
                    }]}/>
                </SpaceBetween>
            </Container>
            <Container header={<Header>Example graph</Header>}>
                {exampleChart}
            </Container>
        </SpaceBetween>
    </ContentLayout>
);
