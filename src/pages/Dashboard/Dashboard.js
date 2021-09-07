import React from 'react';
import styles from './Dashboard.module.css';

import {HeaderModule, HeaderLogo} from '@consta/uikit/Header';
import { Grid, GridItem } from '@consta/uikit/Grid';
import {Informer} from '@consta/uikit/Informer';

import Accounts from '../../components/Accounts/Accounts';
import Deposits from '../../components/Deposits/Deposits';
import History from '../../components/History/History';
//import Bonuses from '../../components/Bonuses/Bonuses';
import PollDeposit from '../../components/PollDeposit/PollDeposit';

const Dashboard = () => {
  return (
    <>
      <HeaderModule indent="l">
        <HeaderLogo className={styles.logo}>
        </HeaderLogo>
      </HeaderModule>
<div className={styles.section}>
      <Grid gap="xl" rowGap="xl" cols="2">
        <GridItem className={styles.gridClassCustomItem}>
            <Informer title="Счета и карты" view="filled" status="system" />
          <Accounts/>
        </GridItem>

        <GridItem className={styles.gridClassCustomItem}>
          <Informer title="Опрос" view="filled" status="system" />
          <PollDeposit/>
        </GridItem>

        <GridItem colStart="1" className={styles.gridClassCustomItem}>
          <Informer title="Вклады" view="filled" status="system" />
          <Deposits/>
        </GridItem>

        <GridItem className={styles.gridClassCustomItem}>
            <Informer title="История операций" view="filled" status="system" />
            <History/>
          </GridItem>





      </Grid>
</div>
    </>
  );
};

export default Dashboard;

