import * as cluster from "cluster";
import * as _ from "lodash";

let dispatchIndex = 0;
/**
 * Dispatches data to workers in a cyclic fashion
 * You can use
 *  process.on('message', (data) => {
        console.info(`Data processed by ${process.pid}`);
    });
 * in workers
 */
export default function dispatch(data: any) {
  // ensure master
  if (!cluster.isMaster) {
    throw new Error("Only master can dispatch");
  }

  // get worker ids, sorted
  const workersIds = _.sortBy(_.keys(cluster.workers), _.identity);

  // ensure at least one worker is available
  if (workersIds.length < 1) {
    throw new Error("No worker process alive");
  }

  // select next worker
  dispatchIndex = dispatchIndex >= workersIds.length ? 0 : dispatchIndex;
  const worker = cluster.workers[workersIds[dispatchIndex]];
  dispatchIndex++;

  // send data to worker
  if (worker) {
    worker.send(data);
  }
}
