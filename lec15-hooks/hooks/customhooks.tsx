import React, {useState, useEffect, useRef} from 'react'
import {AsyncStorage} from 'react-native'

// A type for functions, that, given a configuration, return a promise of a result
// for instance, a function that queries a web service for the result
type Fetcher<Config, Result> = (config: Config) => Promise<Result>

// this hook takes a Fetcher function, and a configuration
// it runs an effect to fetch the data
// it fetches data only when the configuration changes
export const useFetch = <Result, Conf>(
  config: Conf, 
  fetcher: Fetcher<Conf,Result>, 
  init: Result):[Result, boolean] => {
  
  const [data, setData] = useState<Result>(init);
  const [loading, setLoading] = useState(true);

  // the effect will only run when the config parameter changes
  useEffect(() => {
    setLoading(true);

    fetcher(config).then(response => {
      console.log(response)
      setData(response);
      setLoading(false);
    });
  }, [config]);

  // We return the state.  If the effect is run,
  // the state will change, causing a re-render
  return [data, loading];
};

/* 
useFetch has an issue. If we do:
useFetch(configA)
useFetch(configB)
useFetch(configA)

then there will be three web queries, because the configuration changed,

This hook takes a Fetcher function, and a configuration
it runs an effect to fetch the data, but fetches the data 
only if the data is not in the cache.

This hook could be improved by:
- limiting the size of the cache
- making cache items expire
- using a more efficient cache key
*/
export const useCachedFetch = <Result, Conf>(
  config: Conf, 
  fetcher: Fetcher<Conf,Result>, 
  init: Result):[Result, boolean] => {
  const [data, setData] = useState<Result>(init);
  const [cache, setCache] = useState({})
  const [loading, setLoading] = useState(true);
  const key = JSON.stringify(config)

  // notice how the "if" is inside the effect, not outside
  // to not break the rules of hooks
  useEffect(() => { 
    if (key in cache) {
      console.log("cache hit!")
      const data = cache[key]
      setData(data)
      setLoading(false)
    } else {
      console.log("data not in cache, loading it")
      setLoading(true);
      fetcher(config).then(response => {
        setData(response);
        setLoading(false);
        setCache({...cache, [key]: response})
    });
    }
  }, [config]); 
  // strictly speaking, [config] is not necessary
  // since we look into the cache ourselves
  return [data, loading];
};

// a variant of useState that persists the state
// in AsyncStorage. When the component is mounted,
// the state is loaded. When the state changes, it persists.
export const usePersistentState = (initial, key) => {
  const [state, setState] = useState(initial)

  const readState = () => {
    AsyncStorage.getItem(key).then(item => {
      if (item !== null) setState(JSON.parse(item))
    })
  }
  // useEffect with empty array is executed only once
  // when the component is mounted
  useEffect(readState, [])

  // writeState both sets the state, and persists the data
  const writeState = (item) => {
    AsyncStorage.setItem(key, JSON.stringify(item))
    setState(item)
  } 

  // we return writeState, NOT setState
  return [state, writeState]
}


export const useInterval = (callback, delay) => {
  const savedCallback = useRef(()=>null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => savedCallback.current()
    
    if (delay !== null) {
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
    }
  }, [delay]);
}