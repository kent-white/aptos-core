// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import * as React from "react";
import {useAuthContext} from "auth";
import {SocialLoginButton} from "ui";

export function GitHubSignIn() {
  // TODO: Remove fake userId once server-side is hooked up.
  const {setUserId} = useAuthContext();
  return (
    <div>
      <SocialLoginButton
        onSuccess={() => setUserId("example")}
        service="github"
        id="github"
      />
    </div>
  );
}
