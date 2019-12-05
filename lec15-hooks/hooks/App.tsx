import React, {useState} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Constants from 'expo-constants'
import {usePersistentState, useFetch, useCachedFetch, useInterval} from './customhooks'


interface ApiOptions {
  page: number;
  results: number;
  seed: string;
}

interface User {
  id: number;
  name: string;
}

// fetches a page of contacts from the randomuser.me api
const getContacts = async ({page=1, results=10, seed="abd"}): Promise<User[]> => {
  console.log("page:", page)
  const query = `http://randomuser.me/api/?page=${page}&results=${results}&seed=${seed}`
  const response = await fetch(query)
  const theContacts = await response.json()
  const convertedContacts = theContacts.results.map((apiContact, index) => {
      return {
          id: index,
          name: `${apiContact.name.first} ${apiContact.name.last}`, 
          phone: apiContact.phone,
          key: index
      }
  })
  return convertedContacts
}

// displays a page of contacts, and buttons to show other pages of contacts
const UserPages: React.FC<{seed: string}> = ({seed}) => {
  const [currentPage, setCurrentPage] = useState<ApiOptions>({
    page: 1,
    results: 10,
    seed: seed
  });

  // change useFetch to useCachedFetch and spot the difference
  const [users, loading] = useFetch(currentPage, getContacts, []);

  // temporary text in case data is still loading
  if (loading) {
    return <Text>loading....</Text>;
  }

  const pages = [1, 2, 3, 4, 5, 6]
  return (  
    <View>
      {users.map((u: User) => (
        <Text key={u.id}>{u.name}</Text>
      ))}
      <View>
      {pages.map((n: number) => (
            <Button 
                  key={n + ""}
                  title={n + ""}
                  onPress={() => setCurrentPage({ ...currentPage, page: n})}/>
        ))}
        </View>
    </View>
  );
};

// a very basic "custom hook"
// sharing very basic logic
const useCounter = (init) => {
    const [count, setCount] = useState(init)
    const increment = () => setCount(count + 1)
    const decrement = () => setCount(count - 1)
    return [count, increment, decrement]
}

const Counter = props => {
  const [count, inc, dec] = useCounter(0)
  const [paused, setPause] = useState(true)
  const [amount, setAmount] = usePersistentState(1000, "counterxamount")

  // set the interval but:
  // - allow the interval duration to change
  // - allow pausing
  useInterval(inc, paused?null:amount)

  // this second interval divides the first one by two every seconds
  /// uncomment to see the effect!
  /* useInterval(() => {
    if (!paused && (amount > 10)) {
      setAmount(amount / 2);
    }
  }, 1000); */

  return (
    <View >
      <Text style={[styles.paragraph, {fontSize: count}]}>
        {count}
      </Text>
      <Text>Amount is: {amount}</Text>
      <Button title="slower" onPress={() => setAmount(amount * 2)} />
      <Button title="faster" onPress={() => setAmount(amount / 2)} />
      <Button title="++" onPress={inc} />
      <Button title="--" onPress={dec} />
      <Button title={paused?"start":"pause"} onPress={() => setPause(!paused)} />
    </View>
  );
}


const App = props => {
  const [comp, setComp] = useState(true)

  return (
  <View style={styles.container}>
    <Button title="switch" onPress={() => setComp(!comp)} />
    {comp?
      <UserPages seed={"abc"}/>:
      <Counter/>}
  </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
