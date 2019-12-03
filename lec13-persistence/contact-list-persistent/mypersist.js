import tickedoff from 'tickedoff'
import { Container } from "unstated";

// original:
// https://github.com/rt2zz/unstated-persist/blob/master/packages/unstated-persist/src/unstated-persist.js
// note that the original has typescript type definitions.

export class PersistContainer extends Container {
  persist = null

  constructor() {
    super();

    const rehydrate = async () => {
      const {key, version, storage, migrate, init} = this.persist
      const partialState = { _persist_version: version }
      try {
        const serialState = await storage.getItem(key);
        if (serialState !== null) {   
          const incomingState = JSON.parse(serialState)
          const oldVersion = incomingState._persist_version
          if (oldVersion !== version) {
            // versions are different, migration is necessary
            if (process.env.NODE_ENV !== 'production') 
              console.log('unstated-persist: state version mismatch, attempting migration')
            await this.setState(partialState)
            console.log(`migrate from version ${oldVersion} to ${version}`)
            migratedState = await migrate(incomingState, oldVersion)
            // successful migration, data is compatible with new version
            migratedState._persist_version = version
            await this.setState(migratedState)
          } else {
            // state versions match, set state as is
            await this.setState(incomingState) 
          }
        } else {
          // no state on disk
          console.log("no state on disk")
          await this.setState(partialState)
          await init()
        }
      } catch (err) {
        await this.setState(partialState)
        if (process.env.NODE_ENV !== 'production') console.log("error during rehydate", err);
      } finally {
        // dont start persisting until rehydration is complete
        const persist = async () => {
            try {
                console.log("persisting state ...")
                await storage.setItem(key, JSON.stringify(this.state))
            } catch (err) {
                if (process.env.NODE_ENV !== 'production') 
                    console.log("unstated-persist: err during store", err);
            }
        }
        this.subscribe(persist)
      }
    };
    
    tickedoff(rehydrate);
  }
}

export const isBootstrapped = container => 
    container.state._persist_version !== undefined