import React, { Fragment } from "react";

import GTCounter from "../GTCounter";

type GTLoadingProps = {
  children: React.ReactNode;
  loading: boolean;
  progress?: number;
  title: string;
  total?: number;
};

const GTLoading = ({
  children,
  loading,
  progress,
  title,
  total,
}: GTLoadingProps) => {
  const showCounter = progress !== undefined && total !== undefined;
  return loading ? (
    <div className="flex min-h-80 flex-col items-center justify-center gap-6">
      <div className="size-10 animate-spin rounded-full border-b-2 border-green-500" />
      <div className="flex flex-col items-center gap-1">
        {title}
        {showCounter && (
          <div>
            <GTCounter to={progress} />
            {total > 0 && ` / ${total}`}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default GTLoading;
