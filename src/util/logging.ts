import { consola } from 'consola';

export function logInfo(msg: string) {
  consola.info(msg);
}

export function logStart(msg: string) {
  consola.start(msg);
}

export function logWarn(msg: string) {
  consola.warn(msg);
}

export function logSuccess(msg: string) {
  consola.success(msg);
}

export function logError(msg: string) {
  consola.error(msg);
}

export function logBox(msg: string) {
  consola.box(msg);
}
