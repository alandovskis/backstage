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

import { ApiEntityV1alpha1 } from '@backstage/catalog-model';
import { InfoCard } from '@backstage/core';
import React, { FC } from 'react';
import { ApiDefinitionWidget } from '../ApiDefinitionWidget/ApiDefinitionWidget';

export const ApiDefinitionCard: FC<{
  title?: string;
  apiEntity: ApiEntityV1alpha1;
}> = ({ title, apiEntity }) => {
  const type = apiEntity?.spec?.type || '';
  const definition = apiEntity?.spec?.definition || '';

  return (
    <InfoCard title={title} subheader={type}>
      <ApiDefinitionWidget type={type} definition={definition} />
    </InfoCard>
  );
};