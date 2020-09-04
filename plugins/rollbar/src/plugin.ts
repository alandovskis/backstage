/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  createPlugin,
  createApiFactory,
  discoveryApiRef,
} from '@backstage/core';
import { RollbarPage } from './components/RollbarPage/RollbarPage';
import { RollbarProjectPage } from './components/RollbarProjectPage/RollbarProjectPage';
import { rootRoute, rootProjectRoute } from './routes';
import { rollbarApiRef } from './api/RollbarApi';
import { RollbarClient } from './api/RollbarClient';

export const plugin = createPlugin({
  id: 'rollbar',
  apis: [
    createApiFactory({
      api: rollbarApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new RollbarClient({ discoveryApi }),
    }),
  ],
  register({ router }) {
    router.addRoute(rootRoute, RollbarPage);
    router.addRoute(rootProjectRoute, RollbarProjectPage);
  },
});
