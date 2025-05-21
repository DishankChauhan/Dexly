
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Market
 * 
 */
export type Market = $Result.DefaultSelection<Prisma.$MarketPayload>
/**
 * Model Position
 * 
 */
export type Position = $Result.DefaultSelection<Prisma.$PositionPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model Trade
 * 
 */
export type Trade = $Result.DefaultSelection<Prisma.$TradePayload>
/**
 * Model FundingPayment
 * 
 */
export type FundingPayment = $Result.DefaultSelection<Prisma.$FundingPaymentPayload>
/**
 * Model Liquidation
 * 
 */
export type Liquidation = $Result.DefaultSelection<Prisma.$LiquidationPayload>
/**
 * Model PriceHistory
 * 
 */
export type PriceHistory = $Result.DefaultSelection<Prisma.$PriceHistoryPayload>
/**
 * Model SystemHealth
 * 
 */
export type SystemHealth = $Result.DefaultSelection<Prisma.$SystemHealthPayload>
/**
 * Model LiquidationAttempt
 * 
 */
export type LiquidationAttempt = $Result.DefaultSelection<Prisma.$LiquidationAttemptPayload>
/**
 * Model FundingSettlement
 * 
 */
export type FundingSettlement = $Result.DefaultSelection<Prisma.$FundingSettlementPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderType: {
  MARKET: 'MARKET',
  LIMIT: 'LIMIT'
};

export type OrderType = (typeof OrderType)[keyof typeof OrderType]


export const OrderSide: {
  LONG: 'LONG',
  SHORT: 'SHORT'
};

export type OrderSide = (typeof OrderSide)[keyof typeof OrderSide]


export const OrderStatus: {
  OPEN: 'OPEN',
  FILLED: 'FILLED',
  PARTIALLY_FILLED: 'PARTIALLY_FILLED',
  CANCELED: 'CANCELED',
  EXPIRED: 'EXPIRED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

}

export type OrderType = $Enums.OrderType

export const OrderType: typeof $Enums.OrderType

export type OrderSide = $Enums.OrderSide

export const OrderSide: typeof $Enums.OrderSide

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.market`: Exposes CRUD operations for the **Market** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Markets
    * const markets = await prisma.market.findMany()
    * ```
    */
  get market(): Prisma.MarketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.position`: Exposes CRUD operations for the **Position** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Positions
    * const positions = await prisma.position.findMany()
    * ```
    */
  get position(): Prisma.PositionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trade`: Exposes CRUD operations for the **Trade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trades
    * const trades = await prisma.trade.findMany()
    * ```
    */
  get trade(): Prisma.TradeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fundingPayment`: Exposes CRUD operations for the **FundingPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FundingPayments
    * const fundingPayments = await prisma.fundingPayment.findMany()
    * ```
    */
  get fundingPayment(): Prisma.FundingPaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.liquidation`: Exposes CRUD operations for the **Liquidation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Liquidations
    * const liquidations = await prisma.liquidation.findMany()
    * ```
    */
  get liquidation(): Prisma.LiquidationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.priceHistory`: Exposes CRUD operations for the **PriceHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PriceHistories
    * const priceHistories = await prisma.priceHistory.findMany()
    * ```
    */
  get priceHistory(): Prisma.PriceHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemHealth`: Exposes CRUD operations for the **SystemHealth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemHealths
    * const systemHealths = await prisma.systemHealth.findMany()
    * ```
    */
  get systemHealth(): Prisma.SystemHealthDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.liquidationAttempt`: Exposes CRUD operations for the **LiquidationAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LiquidationAttempts
    * const liquidationAttempts = await prisma.liquidationAttempt.findMany()
    * ```
    */
  get liquidationAttempt(): Prisma.LiquidationAttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fundingSettlement`: Exposes CRUD operations for the **FundingSettlement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FundingSettlements
    * const fundingSettlements = await prisma.fundingSettlement.findMany()
    * ```
    */
  get fundingSettlement(): Prisma.FundingSettlementDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Market: 'Market',
    Position: 'Position',
    Order: 'Order',
    Trade: 'Trade',
    FundingPayment: 'FundingPayment',
    Liquidation: 'Liquidation',
    PriceHistory: 'PriceHistory',
    SystemHealth: 'SystemHealth',
    LiquidationAttempt: 'LiquidationAttempt',
    FundingSettlement: 'FundingSettlement'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "market" | "position" | "order" | "trade" | "fundingPayment" | "liquidation" | "priceHistory" | "systemHealth" | "liquidationAttempt" | "fundingSettlement"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Market: {
        payload: Prisma.$MarketPayload<ExtArgs>
        fields: Prisma.MarketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          findFirst: {
            args: Prisma.MarketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          findMany: {
            args: Prisma.MarketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          create: {
            args: Prisma.MarketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          createMany: {
            args: Prisma.MarketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          delete: {
            args: Prisma.MarketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          update: {
            args: Prisma.MarketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          deleteMany: {
            args: Prisma.MarketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          upsert: {
            args: Prisma.MarketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          aggregate: {
            args: Prisma.MarketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarket>
          }
          groupBy: {
            args: Prisma.MarketGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketCountArgs<ExtArgs>
            result: $Utils.Optional<MarketCountAggregateOutputType> | number
          }
        }
      }
      Position: {
        payload: Prisma.$PositionPayload<ExtArgs>
        fields: Prisma.PositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findFirst: {
            args: Prisma.PositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findMany: {
            args: Prisma.PositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          create: {
            args: Prisma.PositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          createMany: {
            args: Prisma.PositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          delete: {
            args: Prisma.PositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          update: {
            args: Prisma.PositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          deleteMany: {
            args: Prisma.PositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PositionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          upsert: {
            args: Prisma.PositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          aggregate: {
            args: Prisma.PositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosition>
          }
          groupBy: {
            args: Prisma.PositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PositionCountArgs<ExtArgs>
            result: $Utils.Optional<PositionCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      Trade: {
        payload: Prisma.$TradePayload<ExtArgs>
        fields: Prisma.TradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findFirst: {
            args: Prisma.TradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findMany: {
            args: Prisma.TradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          create: {
            args: Prisma.TradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          createMany: {
            args: Prisma.TradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          delete: {
            args: Prisma.TradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          update: {
            args: Prisma.TradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          deleteMany: {
            args: Prisma.TradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          upsert: {
            args: Prisma.TradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          aggregate: {
            args: Prisma.TradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade>
          }
          groupBy: {
            args: Prisma.TradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeCountArgs<ExtArgs>
            result: $Utils.Optional<TradeCountAggregateOutputType> | number
          }
        }
      }
      FundingPayment: {
        payload: Prisma.$FundingPaymentPayload<ExtArgs>
        fields: Prisma.FundingPaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FundingPaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FundingPaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload>
          }
          findFirst: {
            args: Prisma.FundingPaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FundingPaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload>
          }
          findMany: {
            args: Prisma.FundingPaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload>[]
          }
          create: {
            args: Prisma.FundingPaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload>
          }
          createMany: {
            args: Prisma.FundingPaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FundingPaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload>[]
          }
          delete: {
            args: Prisma.FundingPaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload>
          }
          update: {
            args: Prisma.FundingPaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload>
          }
          deleteMany: {
            args: Prisma.FundingPaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FundingPaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FundingPaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload>[]
          }
          upsert: {
            args: Prisma.FundingPaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingPaymentPayload>
          }
          aggregate: {
            args: Prisma.FundingPaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFundingPayment>
          }
          groupBy: {
            args: Prisma.FundingPaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<FundingPaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.FundingPaymentCountArgs<ExtArgs>
            result: $Utils.Optional<FundingPaymentCountAggregateOutputType> | number
          }
        }
      }
      Liquidation: {
        payload: Prisma.$LiquidationPayload<ExtArgs>
        fields: Prisma.LiquidationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LiquidationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LiquidationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload>
          }
          findFirst: {
            args: Prisma.LiquidationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LiquidationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload>
          }
          findMany: {
            args: Prisma.LiquidationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload>[]
          }
          create: {
            args: Prisma.LiquidationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload>
          }
          createMany: {
            args: Prisma.LiquidationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LiquidationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload>[]
          }
          delete: {
            args: Prisma.LiquidationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload>
          }
          update: {
            args: Prisma.LiquidationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload>
          }
          deleteMany: {
            args: Prisma.LiquidationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LiquidationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LiquidationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload>[]
          }
          upsert: {
            args: Prisma.LiquidationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationPayload>
          }
          aggregate: {
            args: Prisma.LiquidationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLiquidation>
          }
          groupBy: {
            args: Prisma.LiquidationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LiquidationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LiquidationCountArgs<ExtArgs>
            result: $Utils.Optional<LiquidationCountAggregateOutputType> | number
          }
        }
      }
      PriceHistory: {
        payload: Prisma.$PriceHistoryPayload<ExtArgs>
        fields: Prisma.PriceHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          findFirst: {
            args: Prisma.PriceHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          findMany: {
            args: Prisma.PriceHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>[]
          }
          create: {
            args: Prisma.PriceHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          createMany: {
            args: Prisma.PriceHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>[]
          }
          delete: {
            args: Prisma.PriceHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          update: {
            args: Prisma.PriceHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          deleteMany: {
            args: Prisma.PriceHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriceHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>[]
          }
          upsert: {
            args: Prisma.PriceHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          aggregate: {
            args: Prisma.PriceHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriceHistory>
          }
          groupBy: {
            args: Prisma.PriceHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PriceHistoryCountAggregateOutputType> | number
          }
        }
      }
      SystemHealth: {
        payload: Prisma.$SystemHealthPayload<ExtArgs>
        fields: Prisma.SystemHealthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemHealthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemHealthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload>
          }
          findFirst: {
            args: Prisma.SystemHealthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemHealthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload>
          }
          findMany: {
            args: Prisma.SystemHealthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload>[]
          }
          create: {
            args: Prisma.SystemHealthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload>
          }
          createMany: {
            args: Prisma.SystemHealthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemHealthCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload>[]
          }
          delete: {
            args: Prisma.SystemHealthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload>
          }
          update: {
            args: Prisma.SystemHealthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload>
          }
          deleteMany: {
            args: Prisma.SystemHealthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemHealthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemHealthUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload>[]
          }
          upsert: {
            args: Prisma.SystemHealthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemHealthPayload>
          }
          aggregate: {
            args: Prisma.SystemHealthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemHealth>
          }
          groupBy: {
            args: Prisma.SystemHealthGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemHealthGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemHealthCountArgs<ExtArgs>
            result: $Utils.Optional<SystemHealthCountAggregateOutputType> | number
          }
        }
      }
      LiquidationAttempt: {
        payload: Prisma.$LiquidationAttemptPayload<ExtArgs>
        fields: Prisma.LiquidationAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LiquidationAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LiquidationAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload>
          }
          findFirst: {
            args: Prisma.LiquidationAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LiquidationAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload>
          }
          findMany: {
            args: Prisma.LiquidationAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload>[]
          }
          create: {
            args: Prisma.LiquidationAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload>
          }
          createMany: {
            args: Prisma.LiquidationAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LiquidationAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload>[]
          }
          delete: {
            args: Prisma.LiquidationAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload>
          }
          update: {
            args: Prisma.LiquidationAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload>
          }
          deleteMany: {
            args: Prisma.LiquidationAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LiquidationAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LiquidationAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload>[]
          }
          upsert: {
            args: Prisma.LiquidationAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiquidationAttemptPayload>
          }
          aggregate: {
            args: Prisma.LiquidationAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLiquidationAttempt>
          }
          groupBy: {
            args: Prisma.LiquidationAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<LiquidationAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.LiquidationAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<LiquidationAttemptCountAggregateOutputType> | number
          }
        }
      }
      FundingSettlement: {
        payload: Prisma.$FundingSettlementPayload<ExtArgs>
        fields: Prisma.FundingSettlementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FundingSettlementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FundingSettlementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload>
          }
          findFirst: {
            args: Prisma.FundingSettlementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FundingSettlementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload>
          }
          findMany: {
            args: Prisma.FundingSettlementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload>[]
          }
          create: {
            args: Prisma.FundingSettlementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload>
          }
          createMany: {
            args: Prisma.FundingSettlementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FundingSettlementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload>[]
          }
          delete: {
            args: Prisma.FundingSettlementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload>
          }
          update: {
            args: Prisma.FundingSettlementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload>
          }
          deleteMany: {
            args: Prisma.FundingSettlementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FundingSettlementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FundingSettlementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload>[]
          }
          upsert: {
            args: Prisma.FundingSettlementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingSettlementPayload>
          }
          aggregate: {
            args: Prisma.FundingSettlementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFundingSettlement>
          }
          groupBy: {
            args: Prisma.FundingSettlementGroupByArgs<ExtArgs>
            result: $Utils.Optional<FundingSettlementGroupByOutputType>[]
          }
          count: {
            args: Prisma.FundingSettlementCountArgs<ExtArgs>
            result: $Utils.Optional<FundingSettlementCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    market?: MarketOmit
    position?: PositionOmit
    order?: OrderOmit
    trade?: TradeOmit
    fundingPayment?: FundingPaymentOmit
    liquidation?: LiquidationOmit
    priceHistory?: PriceHistoryOmit
    systemHealth?: SystemHealthOmit
    liquidationAttempt?: LiquidationAttemptOmit
    fundingSettlement?: FundingSettlementOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    positions: number
    orders: number
    trades: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | UserCountOutputTypeCountPositionsArgs
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    trades?: boolean | UserCountOutputTypeCountTradesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }


  /**
   * Count Type MarketCountOutputType
   */

  export type MarketCountOutputType = {
    positions: number
    orders: number
    trades: number
    fundingPayments: number
    liquidations: number
    priceHistory: number
  }

  export type MarketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | MarketCountOutputTypeCountPositionsArgs
    orders?: boolean | MarketCountOutputTypeCountOrdersArgs
    trades?: boolean | MarketCountOutputTypeCountTradesArgs
    fundingPayments?: boolean | MarketCountOutputTypeCountFundingPaymentsArgs
    liquidations?: boolean | MarketCountOutputTypeCountLiquidationsArgs
    priceHistory?: boolean | MarketCountOutputTypeCountPriceHistoryArgs
  }

  // Custom InputTypes
  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketCountOutputType
     */
    select?: MarketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountFundingPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingPaymentWhereInput
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountLiquidationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiquidationWhereInput
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountPriceHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceHistoryWhereInput
  }


  /**
   * Count Type PositionCountOutputType
   */

  export type PositionCountOutputType = {
    fundingPayments: number
    trades: number
  }

  export type PositionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fundingPayments?: boolean | PositionCountOutputTypeCountFundingPaymentsArgs
    trades?: boolean | PositionCountOutputTypeCountTradesArgs
  }

  // Custom InputTypes
  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionCountOutputType
     */
    select?: PositionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeCountFundingPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingPaymentWhereInput
  }

  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    trades: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | OrderCountOutputTypeCountTradesArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    publicKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    publicKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    publicKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    publicKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    publicKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    publicKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    publicKey: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    positions?: boolean | User$positionsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    trades?: boolean | User$tradesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    publicKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "publicKey" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | User$positionsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    trades?: boolean | User$tradesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      positions: Prisma.$PositionPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      trades: Prisma.$TradePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      publicKey: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    positions<T extends User$positionsArgs<ExtArgs> = {}>(args?: Subset<T, User$positionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trades<T extends User$tradesArgs<ExtArgs> = {}>(args?: Subset<T, User$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly publicKey: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.positions
   */
  export type User$positionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    cursor?: PositionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.trades
   */
  export type User$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Market
   */

  export type AggregateMarket = {
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  export type MarketAvgAggregateOutputType = {
    baseAssetReserve: Decimal | null
    quoteAssetReserve: Decimal | null
    fundingRate: Decimal | null
    lastFundingTs: number | null
    totalLongSize: Decimal | null
    totalShortSize: Decimal | null
    maxLeverage: number | null
    minMarginRatioBps: number | null
    feeBps: number | null
    minPositionSize: Decimal | null
    maxPriceImpactBps: number | null
    kFactor: Decimal | null
  }

  export type MarketSumAggregateOutputType = {
    baseAssetReserve: Decimal | null
    quoteAssetReserve: Decimal | null
    fundingRate: Decimal | null
    lastFundingTs: bigint | null
    totalLongSize: Decimal | null
    totalShortSize: Decimal | null
    maxLeverage: number | null
    minMarginRatioBps: number | null
    feeBps: number | null
    minPositionSize: Decimal | null
    maxPriceImpactBps: number | null
    kFactor: Decimal | null
  }

  export type MarketMinAggregateOutputType = {
    id: string | null
    assetSymbol: string | null
    marketAddress: string | null
    baseAssetReserve: Decimal | null
    quoteAssetReserve: Decimal | null
    fundingRate: Decimal | null
    lastFundingTs: bigint | null
    totalLongSize: Decimal | null
    totalShortSize: Decimal | null
    maxLeverage: number | null
    minMarginRatioBps: number | null
    feeBps: number | null
    isActive: boolean | null
    minPositionSize: Decimal | null
    maxPriceImpactBps: number | null
    kFactor: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarketMaxAggregateOutputType = {
    id: string | null
    assetSymbol: string | null
    marketAddress: string | null
    baseAssetReserve: Decimal | null
    quoteAssetReserve: Decimal | null
    fundingRate: Decimal | null
    lastFundingTs: bigint | null
    totalLongSize: Decimal | null
    totalShortSize: Decimal | null
    maxLeverage: number | null
    minMarginRatioBps: number | null
    feeBps: number | null
    isActive: boolean | null
    minPositionSize: Decimal | null
    maxPriceImpactBps: number | null
    kFactor: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarketCountAggregateOutputType = {
    id: number
    assetSymbol: number
    marketAddress: number
    baseAssetReserve: number
    quoteAssetReserve: number
    fundingRate: number
    lastFundingTs: number
    totalLongSize: number
    totalShortSize: number
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: number
    minPositionSize: number
    maxPriceImpactBps: number
    kFactor: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MarketAvgAggregateInputType = {
    baseAssetReserve?: true
    quoteAssetReserve?: true
    fundingRate?: true
    lastFundingTs?: true
    totalLongSize?: true
    totalShortSize?: true
    maxLeverage?: true
    minMarginRatioBps?: true
    feeBps?: true
    minPositionSize?: true
    maxPriceImpactBps?: true
    kFactor?: true
  }

  export type MarketSumAggregateInputType = {
    baseAssetReserve?: true
    quoteAssetReserve?: true
    fundingRate?: true
    lastFundingTs?: true
    totalLongSize?: true
    totalShortSize?: true
    maxLeverage?: true
    minMarginRatioBps?: true
    feeBps?: true
    minPositionSize?: true
    maxPriceImpactBps?: true
    kFactor?: true
  }

  export type MarketMinAggregateInputType = {
    id?: true
    assetSymbol?: true
    marketAddress?: true
    baseAssetReserve?: true
    quoteAssetReserve?: true
    fundingRate?: true
    lastFundingTs?: true
    totalLongSize?: true
    totalShortSize?: true
    maxLeverage?: true
    minMarginRatioBps?: true
    feeBps?: true
    isActive?: true
    minPositionSize?: true
    maxPriceImpactBps?: true
    kFactor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarketMaxAggregateInputType = {
    id?: true
    assetSymbol?: true
    marketAddress?: true
    baseAssetReserve?: true
    quoteAssetReserve?: true
    fundingRate?: true
    lastFundingTs?: true
    totalLongSize?: true
    totalShortSize?: true
    maxLeverage?: true
    minMarginRatioBps?: true
    feeBps?: true
    isActive?: true
    minPositionSize?: true
    maxPriceImpactBps?: true
    kFactor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarketCountAggregateInputType = {
    id?: true
    assetSymbol?: true
    marketAddress?: true
    baseAssetReserve?: true
    quoteAssetReserve?: true
    fundingRate?: true
    lastFundingTs?: true
    totalLongSize?: true
    totalShortSize?: true
    maxLeverage?: true
    minMarginRatioBps?: true
    feeBps?: true
    isActive?: true
    minPositionSize?: true
    maxPriceImpactBps?: true
    kFactor?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MarketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Market to aggregate.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Markets
    **/
    _count?: true | MarketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketMaxAggregateInputType
  }

  export type GetMarketAggregateType<T extends MarketAggregateArgs> = {
        [P in keyof T & keyof AggregateMarket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarket[P]>
      : GetScalarType<T[P], AggregateMarket[P]>
  }




  export type MarketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketWhereInput
    orderBy?: MarketOrderByWithAggregationInput | MarketOrderByWithAggregationInput[]
    by: MarketScalarFieldEnum[] | MarketScalarFieldEnum
    having?: MarketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketCountAggregateInputType | true
    _avg?: MarketAvgAggregateInputType
    _sum?: MarketSumAggregateInputType
    _min?: MarketMinAggregateInputType
    _max?: MarketMaxAggregateInputType
  }

  export type MarketGroupByOutputType = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal
    quoteAssetReserve: Decimal
    fundingRate: Decimal
    lastFundingTs: bigint
    totalLongSize: Decimal
    totalShortSize: Decimal
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal
    maxPriceImpactBps: number
    kFactor: Decimal
    createdAt: Date
    updatedAt: Date
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  type GetMarketGroupByPayload<T extends MarketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketGroupByOutputType[P]>
            : GetScalarType<T[P], MarketGroupByOutputType[P]>
        }
      >
    >


  export type MarketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetSymbol?: boolean
    marketAddress?: boolean
    baseAssetReserve?: boolean
    quoteAssetReserve?: boolean
    fundingRate?: boolean
    lastFundingTs?: boolean
    totalLongSize?: boolean
    totalShortSize?: boolean
    maxLeverage?: boolean
    minMarginRatioBps?: boolean
    feeBps?: boolean
    isActive?: boolean
    minPositionSize?: boolean
    maxPriceImpactBps?: boolean
    kFactor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    positions?: boolean | Market$positionsArgs<ExtArgs>
    orders?: boolean | Market$ordersArgs<ExtArgs>
    trades?: boolean | Market$tradesArgs<ExtArgs>
    fundingPayments?: boolean | Market$fundingPaymentsArgs<ExtArgs>
    liquidations?: boolean | Market$liquidationsArgs<ExtArgs>
    priceHistory?: boolean | Market$priceHistoryArgs<ExtArgs>
    _count?: boolean | MarketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["market"]>

  export type MarketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetSymbol?: boolean
    marketAddress?: boolean
    baseAssetReserve?: boolean
    quoteAssetReserve?: boolean
    fundingRate?: boolean
    lastFundingTs?: boolean
    totalLongSize?: boolean
    totalShortSize?: boolean
    maxLeverage?: boolean
    minMarginRatioBps?: boolean
    feeBps?: boolean
    isActive?: boolean
    minPositionSize?: boolean
    maxPriceImpactBps?: boolean
    kFactor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["market"]>

  export type MarketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetSymbol?: boolean
    marketAddress?: boolean
    baseAssetReserve?: boolean
    quoteAssetReserve?: boolean
    fundingRate?: boolean
    lastFundingTs?: boolean
    totalLongSize?: boolean
    totalShortSize?: boolean
    maxLeverage?: boolean
    minMarginRatioBps?: boolean
    feeBps?: boolean
    isActive?: boolean
    minPositionSize?: boolean
    maxPriceImpactBps?: boolean
    kFactor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["market"]>

  export type MarketSelectScalar = {
    id?: boolean
    assetSymbol?: boolean
    marketAddress?: boolean
    baseAssetReserve?: boolean
    quoteAssetReserve?: boolean
    fundingRate?: boolean
    lastFundingTs?: boolean
    totalLongSize?: boolean
    totalShortSize?: boolean
    maxLeverage?: boolean
    minMarginRatioBps?: boolean
    feeBps?: boolean
    isActive?: boolean
    minPositionSize?: boolean
    maxPriceImpactBps?: boolean
    kFactor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MarketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assetSymbol" | "marketAddress" | "baseAssetReserve" | "quoteAssetReserve" | "fundingRate" | "lastFundingTs" | "totalLongSize" | "totalShortSize" | "maxLeverage" | "minMarginRatioBps" | "feeBps" | "isActive" | "minPositionSize" | "maxPriceImpactBps" | "kFactor" | "createdAt" | "updatedAt", ExtArgs["result"]["market"]>
  export type MarketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | Market$positionsArgs<ExtArgs>
    orders?: boolean | Market$ordersArgs<ExtArgs>
    trades?: boolean | Market$tradesArgs<ExtArgs>
    fundingPayments?: boolean | Market$fundingPaymentsArgs<ExtArgs>
    liquidations?: boolean | Market$liquidationsArgs<ExtArgs>
    priceHistory?: boolean | Market$priceHistoryArgs<ExtArgs>
    _count?: boolean | MarketCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MarketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MarketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MarketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Market"
    objects: {
      positions: Prisma.$PositionPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      trades: Prisma.$TradePayload<ExtArgs>[]
      fundingPayments: Prisma.$FundingPaymentPayload<ExtArgs>[]
      liquidations: Prisma.$LiquidationPayload<ExtArgs>[]
      priceHistory: Prisma.$PriceHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assetSymbol: string
      marketAddress: string
      baseAssetReserve: Prisma.Decimal
      quoteAssetReserve: Prisma.Decimal
      fundingRate: Prisma.Decimal
      lastFundingTs: bigint
      totalLongSize: Prisma.Decimal
      totalShortSize: Prisma.Decimal
      maxLeverage: number
      minMarginRatioBps: number
      feeBps: number
      isActive: boolean
      minPositionSize: Prisma.Decimal
      maxPriceImpactBps: number
      kFactor: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["market"]>
    composites: {}
  }

  type MarketGetPayload<S extends boolean | null | undefined | MarketDefaultArgs> = $Result.GetResult<Prisma.$MarketPayload, S>

  type MarketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketCountAggregateInputType | true
    }

  export interface MarketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Market'], meta: { name: 'Market' } }
    /**
     * Find zero or one Market that matches the filter.
     * @param {MarketFindUniqueArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketFindUniqueArgs>(args: SelectSubset<T, MarketFindUniqueArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Market that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketFindUniqueOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Market that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketFindFirstArgs>(args?: SelectSubset<T, MarketFindFirstArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Market that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Markets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Markets
     * const markets = await prisma.market.findMany()
     * 
     * // Get first 10 Markets
     * const markets = await prisma.market.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marketWithIdOnly = await prisma.market.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarketFindManyArgs>(args?: SelectSubset<T, MarketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Market.
     * @param {MarketCreateArgs} args - Arguments to create a Market.
     * @example
     * // Create one Market
     * const Market = await prisma.market.create({
     *   data: {
     *     // ... data to create a Market
     *   }
     * })
     * 
     */
    create<T extends MarketCreateArgs>(args: SelectSubset<T, MarketCreateArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Markets.
     * @param {MarketCreateManyArgs} args - Arguments to create many Markets.
     * @example
     * // Create many Markets
     * const market = await prisma.market.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketCreateManyArgs>(args?: SelectSubset<T, MarketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Markets and returns the data saved in the database.
     * @param {MarketCreateManyAndReturnArgs} args - Arguments to create many Markets.
     * @example
     * // Create many Markets
     * const market = await prisma.market.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Markets and only return the `id`
     * const marketWithIdOnly = await prisma.market.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Market.
     * @param {MarketDeleteArgs} args - Arguments to delete one Market.
     * @example
     * // Delete one Market
     * const Market = await prisma.market.delete({
     *   where: {
     *     // ... filter to delete one Market
     *   }
     * })
     * 
     */
    delete<T extends MarketDeleteArgs>(args: SelectSubset<T, MarketDeleteArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Market.
     * @param {MarketUpdateArgs} args - Arguments to update one Market.
     * @example
     * // Update one Market
     * const market = await prisma.market.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketUpdateArgs>(args: SelectSubset<T, MarketUpdateArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Markets.
     * @param {MarketDeleteManyArgs} args - Arguments to filter Markets to delete.
     * @example
     * // Delete a few Markets
     * const { count } = await prisma.market.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketDeleteManyArgs>(args?: SelectSubset<T, MarketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Markets
     * const market = await prisma.market.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketUpdateManyArgs>(args: SelectSubset<T, MarketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Markets and returns the data updated in the database.
     * @param {MarketUpdateManyAndReturnArgs} args - Arguments to update many Markets.
     * @example
     * // Update many Markets
     * const market = await prisma.market.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Markets and only return the `id`
     * const marketWithIdOnly = await prisma.market.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Market.
     * @param {MarketUpsertArgs} args - Arguments to update or create a Market.
     * @example
     * // Update or create a Market
     * const market = await prisma.market.upsert({
     *   create: {
     *     // ... data to create a Market
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Market we want to update
     *   }
     * })
     */
    upsert<T extends MarketUpsertArgs>(args: SelectSubset<T, MarketUpsertArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketCountArgs} args - Arguments to filter Markets to count.
     * @example
     * // Count the number of Markets
     * const count = await prisma.market.count({
     *   where: {
     *     // ... the filter for the Markets we want to count
     *   }
     * })
    **/
    count<T extends MarketCountArgs>(
      args?: Subset<T, MarketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketAggregateArgs>(args: Subset<T, MarketAggregateArgs>): Prisma.PrismaPromise<GetMarketAggregateType<T>>

    /**
     * Group by Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketGroupByArgs['orderBy'] }
        : { orderBy?: MarketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Market model
   */
  readonly fields: MarketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Market.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    positions<T extends Market$positionsArgs<ExtArgs> = {}>(args?: Subset<T, Market$positionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Market$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Market$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trades<T extends Market$tradesArgs<ExtArgs> = {}>(args?: Subset<T, Market$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fundingPayments<T extends Market$fundingPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, Market$fundingPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    liquidations<T extends Market$liquidationsArgs<ExtArgs> = {}>(args?: Subset<T, Market$liquidationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    priceHistory<T extends Market$priceHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Market$priceHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Market model
   */
  interface MarketFieldRefs {
    readonly id: FieldRef<"Market", 'String'>
    readonly assetSymbol: FieldRef<"Market", 'String'>
    readonly marketAddress: FieldRef<"Market", 'String'>
    readonly baseAssetReserve: FieldRef<"Market", 'Decimal'>
    readonly quoteAssetReserve: FieldRef<"Market", 'Decimal'>
    readonly fundingRate: FieldRef<"Market", 'Decimal'>
    readonly lastFundingTs: FieldRef<"Market", 'BigInt'>
    readonly totalLongSize: FieldRef<"Market", 'Decimal'>
    readonly totalShortSize: FieldRef<"Market", 'Decimal'>
    readonly maxLeverage: FieldRef<"Market", 'Int'>
    readonly minMarginRatioBps: FieldRef<"Market", 'Int'>
    readonly feeBps: FieldRef<"Market", 'Int'>
    readonly isActive: FieldRef<"Market", 'Boolean'>
    readonly minPositionSize: FieldRef<"Market", 'Decimal'>
    readonly maxPriceImpactBps: FieldRef<"Market", 'Int'>
    readonly kFactor: FieldRef<"Market", 'Decimal'>
    readonly createdAt: FieldRef<"Market", 'DateTime'>
    readonly updatedAt: FieldRef<"Market", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Market findUnique
   */
  export type MarketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market findUniqueOrThrow
   */
  export type MarketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market findFirst
   */
  export type MarketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market findFirstOrThrow
   */
  export type MarketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market findMany
   */
  export type MarketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Markets to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market create
   */
  export type MarketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * The data needed to create a Market.
     */
    data: XOR<MarketCreateInput, MarketUncheckedCreateInput>
  }

  /**
   * Market createMany
   */
  export type MarketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Markets.
     */
    data: MarketCreateManyInput | MarketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Market createManyAndReturn
   */
  export type MarketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data used to create many Markets.
     */
    data: MarketCreateManyInput | MarketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Market update
   */
  export type MarketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * The data needed to update a Market.
     */
    data: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
    /**
     * Choose, which Market to update.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market updateMany
   */
  export type MarketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Markets.
     */
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyInput>
    /**
     * Filter which Markets to update
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to update.
     */
    limit?: number
  }

  /**
   * Market updateManyAndReturn
   */
  export type MarketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data used to update Markets.
     */
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyInput>
    /**
     * Filter which Markets to update
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to update.
     */
    limit?: number
  }

  /**
   * Market upsert
   */
  export type MarketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * The filter to search for the Market to update in case it exists.
     */
    where: MarketWhereUniqueInput
    /**
     * In case the Market found by the `where` argument doesn't exist, create a new Market with this data.
     */
    create: XOR<MarketCreateInput, MarketUncheckedCreateInput>
    /**
     * In case the Market was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
  }

  /**
   * Market delete
   */
  export type MarketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter which Market to delete.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market deleteMany
   */
  export type MarketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Markets to delete
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to delete.
     */
    limit?: number
  }

  /**
   * Market.positions
   */
  export type Market$positionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    cursor?: PositionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Market.orders
   */
  export type Market$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Market.trades
   */
  export type Market$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Market.fundingPayments
   */
  export type Market$fundingPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    where?: FundingPaymentWhereInput
    orderBy?: FundingPaymentOrderByWithRelationInput | FundingPaymentOrderByWithRelationInput[]
    cursor?: FundingPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FundingPaymentScalarFieldEnum | FundingPaymentScalarFieldEnum[]
  }

  /**
   * Market.liquidations
   */
  export type Market$liquidationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    where?: LiquidationWhereInput
    orderBy?: LiquidationOrderByWithRelationInput | LiquidationOrderByWithRelationInput[]
    cursor?: LiquidationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LiquidationScalarFieldEnum | LiquidationScalarFieldEnum[]
  }

  /**
   * Market.priceHistory
   */
  export type Market$priceHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    where?: PriceHistoryWhereInput
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    cursor?: PriceHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceHistoryScalarFieldEnum | PriceHistoryScalarFieldEnum[]
  }

  /**
   * Market without action
   */
  export type MarketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
  }


  /**
   * Model Position
   */

  export type AggregatePosition = {
    _count: PositionCountAggregateOutputType | null
    _avg: PositionAvgAggregateOutputType | null
    _sum: PositionSumAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  export type PositionAvgAggregateOutputType = {
    size: Decimal | null
    entryPrice: Decimal | null
    collateral: Decimal | null
    leverage: number | null
    openedAt: number | null
    lastFundingTs: number | null
    realizedPnlFromFunding: Decimal | null
    liquidationPrice: Decimal | null
    closedAt: number | null
    closingPrice: Decimal | null
    realizedPnl: Decimal | null
  }

  export type PositionSumAggregateOutputType = {
    size: Decimal | null
    entryPrice: Decimal | null
    collateral: Decimal | null
    leverage: number | null
    openedAt: bigint | null
    lastFundingTs: bigint | null
    realizedPnlFromFunding: Decimal | null
    liquidationPrice: Decimal | null
    closedAt: bigint | null
    closingPrice: Decimal | null
    realizedPnl: Decimal | null
  }

  export type PositionMinAggregateOutputType = {
    id: string | null
    positionAddress: string | null
    userId: string | null
    marketId: string | null
    isLong: boolean | null
    size: Decimal | null
    entryPrice: Decimal | null
    collateral: Decimal | null
    leverage: number | null
    openedAt: bigint | null
    lastFundingTs: bigint | null
    realizedPnlFromFunding: Decimal | null
    liquidationPrice: Decimal | null
    isClosed: boolean | null
    closedAt: bigint | null
    closingPrice: Decimal | null
    realizedPnl: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PositionMaxAggregateOutputType = {
    id: string | null
    positionAddress: string | null
    userId: string | null
    marketId: string | null
    isLong: boolean | null
    size: Decimal | null
    entryPrice: Decimal | null
    collateral: Decimal | null
    leverage: number | null
    openedAt: bigint | null
    lastFundingTs: bigint | null
    realizedPnlFromFunding: Decimal | null
    liquidationPrice: Decimal | null
    isClosed: boolean | null
    closedAt: bigint | null
    closingPrice: Decimal | null
    realizedPnl: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PositionCountAggregateOutputType = {
    id: number
    positionAddress: number
    userId: number
    marketId: number
    isLong: number
    size: number
    entryPrice: number
    collateral: number
    leverage: number
    openedAt: number
    lastFundingTs: number
    realizedPnlFromFunding: number
    liquidationPrice: number
    isClosed: number
    closedAt: number
    closingPrice: number
    realizedPnl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PositionAvgAggregateInputType = {
    size?: true
    entryPrice?: true
    collateral?: true
    leverage?: true
    openedAt?: true
    lastFundingTs?: true
    realizedPnlFromFunding?: true
    liquidationPrice?: true
    closedAt?: true
    closingPrice?: true
    realizedPnl?: true
  }

  export type PositionSumAggregateInputType = {
    size?: true
    entryPrice?: true
    collateral?: true
    leverage?: true
    openedAt?: true
    lastFundingTs?: true
    realizedPnlFromFunding?: true
    liquidationPrice?: true
    closedAt?: true
    closingPrice?: true
    realizedPnl?: true
  }

  export type PositionMinAggregateInputType = {
    id?: true
    positionAddress?: true
    userId?: true
    marketId?: true
    isLong?: true
    size?: true
    entryPrice?: true
    collateral?: true
    leverage?: true
    openedAt?: true
    lastFundingTs?: true
    realizedPnlFromFunding?: true
    liquidationPrice?: true
    isClosed?: true
    closedAt?: true
    closingPrice?: true
    realizedPnl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PositionMaxAggregateInputType = {
    id?: true
    positionAddress?: true
    userId?: true
    marketId?: true
    isLong?: true
    size?: true
    entryPrice?: true
    collateral?: true
    leverage?: true
    openedAt?: true
    lastFundingTs?: true
    realizedPnlFromFunding?: true
    liquidationPrice?: true
    isClosed?: true
    closedAt?: true
    closingPrice?: true
    realizedPnl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PositionCountAggregateInputType = {
    id?: true
    positionAddress?: true
    userId?: true
    marketId?: true
    isLong?: true
    size?: true
    entryPrice?: true
    collateral?: true
    leverage?: true
    openedAt?: true
    lastFundingTs?: true
    realizedPnlFromFunding?: true
    liquidationPrice?: true
    isClosed?: true
    closedAt?: true
    closingPrice?: true
    realizedPnl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Position to aggregate.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Positions
    **/
    _count?: true | PositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PositionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PositionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PositionMaxAggregateInputType
  }

  export type GetPositionAggregateType<T extends PositionAggregateArgs> = {
        [P in keyof T & keyof AggregatePosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosition[P]>
      : GetScalarType<T[P], AggregatePosition[P]>
  }




  export type PositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithAggregationInput | PositionOrderByWithAggregationInput[]
    by: PositionScalarFieldEnum[] | PositionScalarFieldEnum
    having?: PositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PositionCountAggregateInputType | true
    _avg?: PositionAvgAggregateInputType
    _sum?: PositionSumAggregateInputType
    _min?: PositionMinAggregateInputType
    _max?: PositionMaxAggregateInputType
  }

  export type PositionGroupByOutputType = {
    id: string
    positionAddress: string
    userId: string
    marketId: string
    isLong: boolean
    size: Decimal
    entryPrice: Decimal
    collateral: Decimal
    leverage: number
    openedAt: bigint
    lastFundingTs: bigint
    realizedPnlFromFunding: Decimal
    liquidationPrice: Decimal
    isClosed: boolean
    closedAt: bigint | null
    closingPrice: Decimal | null
    realizedPnl: Decimal | null
    createdAt: Date
    updatedAt: Date
    _count: PositionCountAggregateOutputType | null
    _avg: PositionAvgAggregateOutputType | null
    _sum: PositionSumAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  type GetPositionGroupByPayload<T extends PositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PositionGroupByOutputType[P]>
            : GetScalarType<T[P], PositionGroupByOutputType[P]>
        }
      >
    >


  export type PositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionAddress?: boolean
    userId?: boolean
    marketId?: boolean
    isLong?: boolean
    size?: boolean
    entryPrice?: boolean
    collateral?: boolean
    leverage?: boolean
    openedAt?: boolean
    lastFundingTs?: boolean
    realizedPnlFromFunding?: boolean
    liquidationPrice?: boolean
    isClosed?: boolean
    closedAt?: boolean
    closingPrice?: boolean
    realizedPnl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    fundingPayments?: boolean | Position$fundingPaymentsArgs<ExtArgs>
    liquidation?: boolean | Position$liquidationArgs<ExtArgs>
    trades?: boolean | Position$tradesArgs<ExtArgs>
    _count?: boolean | PositionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionAddress?: boolean
    userId?: boolean
    marketId?: boolean
    isLong?: boolean
    size?: boolean
    entryPrice?: boolean
    collateral?: boolean
    leverage?: boolean
    openedAt?: boolean
    lastFundingTs?: boolean
    realizedPnlFromFunding?: boolean
    liquidationPrice?: boolean
    isClosed?: boolean
    closedAt?: boolean
    closingPrice?: boolean
    realizedPnl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionAddress?: boolean
    userId?: boolean
    marketId?: boolean
    isLong?: boolean
    size?: boolean
    entryPrice?: boolean
    collateral?: boolean
    leverage?: boolean
    openedAt?: boolean
    lastFundingTs?: boolean
    realizedPnlFromFunding?: boolean
    liquidationPrice?: boolean
    isClosed?: boolean
    closedAt?: boolean
    closingPrice?: boolean
    realizedPnl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectScalar = {
    id?: boolean
    positionAddress?: boolean
    userId?: boolean
    marketId?: boolean
    isLong?: boolean
    size?: boolean
    entryPrice?: boolean
    collateral?: boolean
    leverage?: boolean
    openedAt?: boolean
    lastFundingTs?: boolean
    realizedPnlFromFunding?: boolean
    liquidationPrice?: boolean
    isClosed?: boolean
    closedAt?: boolean
    closingPrice?: boolean
    realizedPnl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PositionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "positionAddress" | "userId" | "marketId" | "isLong" | "size" | "entryPrice" | "collateral" | "leverage" | "openedAt" | "lastFundingTs" | "realizedPnlFromFunding" | "liquidationPrice" | "isClosed" | "closedAt" | "closingPrice" | "realizedPnl" | "createdAt" | "updatedAt", ExtArgs["result"]["position"]>
  export type PositionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    fundingPayments?: boolean | Position$fundingPaymentsArgs<ExtArgs>
    liquidation?: boolean | Position$liquidationArgs<ExtArgs>
    trades?: boolean | Position$tradesArgs<ExtArgs>
    _count?: boolean | PositionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PositionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }
  export type PositionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }

  export type $PositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Position"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      market: Prisma.$MarketPayload<ExtArgs>
      fundingPayments: Prisma.$FundingPaymentPayload<ExtArgs>[]
      liquidation: Prisma.$LiquidationPayload<ExtArgs> | null
      trades: Prisma.$TradePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      positionAddress: string
      userId: string
      marketId: string
      isLong: boolean
      size: Prisma.Decimal
      entryPrice: Prisma.Decimal
      collateral: Prisma.Decimal
      leverage: number
      openedAt: bigint
      lastFundingTs: bigint
      realizedPnlFromFunding: Prisma.Decimal
      liquidationPrice: Prisma.Decimal
      isClosed: boolean
      closedAt: bigint | null
      closingPrice: Prisma.Decimal | null
      realizedPnl: Prisma.Decimal | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["position"]>
    composites: {}
  }

  type PositionGetPayload<S extends boolean | null | undefined | PositionDefaultArgs> = $Result.GetResult<Prisma.$PositionPayload, S>

  type PositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PositionCountAggregateInputType | true
    }

  export interface PositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Position'], meta: { name: 'Position' } }
    /**
     * Find zero or one Position that matches the filter.
     * @param {PositionFindUniqueArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PositionFindUniqueArgs>(args: SelectSubset<T, PositionFindUniqueArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Position that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PositionFindUniqueOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PositionFindUniqueOrThrowArgs>(args: SelectSubset<T, PositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Position that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PositionFindFirstArgs>(args?: SelectSubset<T, PositionFindFirstArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Position that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PositionFindFirstOrThrowArgs>(args?: SelectSubset<T, PositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Positions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Positions
     * const positions = await prisma.position.findMany()
     * 
     * // Get first 10 Positions
     * const positions = await prisma.position.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const positionWithIdOnly = await prisma.position.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PositionFindManyArgs>(args?: SelectSubset<T, PositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Position.
     * @param {PositionCreateArgs} args - Arguments to create a Position.
     * @example
     * // Create one Position
     * const Position = await prisma.position.create({
     *   data: {
     *     // ... data to create a Position
     *   }
     * })
     * 
     */
    create<T extends PositionCreateArgs>(args: SelectSubset<T, PositionCreateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Positions.
     * @param {PositionCreateManyArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PositionCreateManyArgs>(args?: SelectSubset<T, PositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Positions and returns the data saved in the database.
     * @param {PositionCreateManyAndReturnArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PositionCreateManyAndReturnArgs>(args?: SelectSubset<T, PositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Position.
     * @param {PositionDeleteArgs} args - Arguments to delete one Position.
     * @example
     * // Delete one Position
     * const Position = await prisma.position.delete({
     *   where: {
     *     // ... filter to delete one Position
     *   }
     * })
     * 
     */
    delete<T extends PositionDeleteArgs>(args: SelectSubset<T, PositionDeleteArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Position.
     * @param {PositionUpdateArgs} args - Arguments to update one Position.
     * @example
     * // Update one Position
     * const position = await prisma.position.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PositionUpdateArgs>(args: SelectSubset<T, PositionUpdateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Positions.
     * @param {PositionDeleteManyArgs} args - Arguments to filter Positions to delete.
     * @example
     * // Delete a few Positions
     * const { count } = await prisma.position.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PositionDeleteManyArgs>(args?: SelectSubset<T, PositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PositionUpdateManyArgs>(args: SelectSubset<T, PositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions and returns the data updated in the database.
     * @param {PositionUpdateManyAndReturnArgs} args - Arguments to update many Positions.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PositionUpdateManyAndReturnArgs>(args: SelectSubset<T, PositionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Position.
     * @param {PositionUpsertArgs} args - Arguments to update or create a Position.
     * @example
     * // Update or create a Position
     * const position = await prisma.position.upsert({
     *   create: {
     *     // ... data to create a Position
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Position we want to update
     *   }
     * })
     */
    upsert<T extends PositionUpsertArgs>(args: SelectSubset<T, PositionUpsertArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionCountArgs} args - Arguments to filter Positions to count.
     * @example
     * // Count the number of Positions
     * const count = await prisma.position.count({
     *   where: {
     *     // ... the filter for the Positions we want to count
     *   }
     * })
    **/
    count<T extends PositionCountArgs>(
      args?: Subset<T, PositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PositionAggregateArgs>(args: Subset<T, PositionAggregateArgs>): Prisma.PrismaPromise<GetPositionAggregateType<T>>

    /**
     * Group by Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PositionGroupByArgs['orderBy'] }
        : { orderBy?: PositionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Position model
   */
  readonly fields: PositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Position.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    market<T extends MarketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MarketDefaultArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fundingPayments<T extends Position$fundingPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, Position$fundingPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    liquidation<T extends Position$liquidationArgs<ExtArgs> = {}>(args?: Subset<T, Position$liquidationArgs<ExtArgs>>): Prisma__LiquidationClient<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    trades<T extends Position$tradesArgs<ExtArgs> = {}>(args?: Subset<T, Position$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Position model
   */
  interface PositionFieldRefs {
    readonly id: FieldRef<"Position", 'String'>
    readonly positionAddress: FieldRef<"Position", 'String'>
    readonly userId: FieldRef<"Position", 'String'>
    readonly marketId: FieldRef<"Position", 'String'>
    readonly isLong: FieldRef<"Position", 'Boolean'>
    readonly size: FieldRef<"Position", 'Decimal'>
    readonly entryPrice: FieldRef<"Position", 'Decimal'>
    readonly collateral: FieldRef<"Position", 'Decimal'>
    readonly leverage: FieldRef<"Position", 'Int'>
    readonly openedAt: FieldRef<"Position", 'BigInt'>
    readonly lastFundingTs: FieldRef<"Position", 'BigInt'>
    readonly realizedPnlFromFunding: FieldRef<"Position", 'Decimal'>
    readonly liquidationPrice: FieldRef<"Position", 'Decimal'>
    readonly isClosed: FieldRef<"Position", 'Boolean'>
    readonly closedAt: FieldRef<"Position", 'BigInt'>
    readonly closingPrice: FieldRef<"Position", 'Decimal'>
    readonly realizedPnl: FieldRef<"Position", 'Decimal'>
    readonly createdAt: FieldRef<"Position", 'DateTime'>
    readonly updatedAt: FieldRef<"Position", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Position findUnique
   */
  export type PositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findUniqueOrThrow
   */
  export type PositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findFirst
   */
  export type PositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findFirstOrThrow
   */
  export type PositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findMany
   */
  export type PositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Positions to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position create
   */
  export type PositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to create a Position.
     */
    data: XOR<PositionCreateInput, PositionUncheckedCreateInput>
  }

  /**
   * Position createMany
   */
  export type PositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Position createManyAndReturn
   */
  export type PositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Position update
   */
  export type PositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to update a Position.
     */
    data: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
    /**
     * Choose, which Position to update.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position updateMany
   */
  export type PositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to update.
     */
    limit?: number
  }

  /**
   * Position updateManyAndReturn
   */
  export type PositionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Position upsert
   */
  export type PositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The filter to search for the Position to update in case it exists.
     */
    where: PositionWhereUniqueInput
    /**
     * In case the Position found by the `where` argument doesn't exist, create a new Position with this data.
     */
    create: XOR<PositionCreateInput, PositionUncheckedCreateInput>
    /**
     * In case the Position was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
  }

  /**
   * Position delete
   */
  export type PositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter which Position to delete.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position deleteMany
   */
  export type PositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Positions to delete
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to delete.
     */
    limit?: number
  }

  /**
   * Position.fundingPayments
   */
  export type Position$fundingPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    where?: FundingPaymentWhereInput
    orderBy?: FundingPaymentOrderByWithRelationInput | FundingPaymentOrderByWithRelationInput[]
    cursor?: FundingPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FundingPaymentScalarFieldEnum | FundingPaymentScalarFieldEnum[]
  }

  /**
   * Position.liquidation
   */
  export type Position$liquidationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    where?: LiquidationWhereInput
  }

  /**
   * Position.trades
   */
  export type Position$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Position without action
   */
  export type PositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    orderType: number | null
    leverage: number | null
    maxSlippageBps: number | null
  }

  export type OrderSumAggregateOutputType = {
    orderType: number | null
    leverage: number | null
    maxSlippageBps: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    marketId: string | null
    orderType: number | null
    isLong: boolean | null
    size: string | null
    price: string | null
    collateral: string | null
    leverage: number | null
    isActive: boolean | null
    maxSlippageBps: number | null
    createdAt: string | null
    positionId: string | null
    executionPrice: string | null
    executedAt: string | null
    cancelledAt: string | null
    txHash: string | null
    lastError: string | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    marketId: string | null
    orderType: number | null
    isLong: boolean | null
    size: string | null
    price: string | null
    collateral: string | null
    leverage: number | null
    isActive: boolean | null
    maxSlippageBps: number | null
    createdAt: string | null
    positionId: string | null
    executionPrice: string | null
    executedAt: string | null
    cancelledAt: string | null
    txHash: string | null
    lastError: string | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    userId: number
    marketId: number
    orderType: number
    isLong: number
    size: number
    price: number
    collateral: number
    leverage: number
    isActive: number
    maxSlippageBps: number
    createdAt: number
    positionId: number
    executionPrice: number
    executedAt: number
    cancelledAt: number
    txHash: number
    lastError: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    orderType?: true
    leverage?: true
    maxSlippageBps?: true
  }

  export type OrderSumAggregateInputType = {
    orderType?: true
    leverage?: true
    maxSlippageBps?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    userId?: true
    marketId?: true
    orderType?: true
    isLong?: true
    size?: true
    price?: true
    collateral?: true
    leverage?: true
    isActive?: true
    maxSlippageBps?: true
    createdAt?: true
    positionId?: true
    executionPrice?: true
    executedAt?: true
    cancelledAt?: true
    txHash?: true
    lastError?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    userId?: true
    marketId?: true
    orderType?: true
    isLong?: true
    size?: true
    price?: true
    collateral?: true
    leverage?: true
    isActive?: true
    maxSlippageBps?: true
    createdAt?: true
    positionId?: true
    executionPrice?: true
    executedAt?: true
    cancelledAt?: true
    txHash?: true
    lastError?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    userId?: true
    marketId?: true
    orderType?: true
    isLong?: true
    size?: true
    price?: true
    collateral?: true
    leverage?: true
    isActive?: true
    maxSlippageBps?: true
    createdAt?: true
    positionId?: true
    executionPrice?: true
    executedAt?: true
    cancelledAt?: true
    txHash?: true
    lastError?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    userId: string
    marketId: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive: boolean
    maxSlippageBps: number
    createdAt: string
    positionId: string | null
    executionPrice: string | null
    executedAt: string | null
    cancelledAt: string | null
    txHash: string | null
    lastError: string | null
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    marketId?: boolean
    orderType?: boolean
    isLong?: boolean
    size?: boolean
    price?: boolean
    collateral?: boolean
    leverage?: boolean
    isActive?: boolean
    maxSlippageBps?: boolean
    createdAt?: boolean
    positionId?: boolean
    executionPrice?: boolean
    executedAt?: boolean
    cancelledAt?: boolean
    txHash?: boolean
    lastError?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    trades?: boolean | Order$tradesArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    marketId?: boolean
    orderType?: boolean
    isLong?: boolean
    size?: boolean
    price?: boolean
    collateral?: boolean
    leverage?: boolean
    isActive?: boolean
    maxSlippageBps?: boolean
    createdAt?: boolean
    positionId?: boolean
    executionPrice?: boolean
    executedAt?: boolean
    cancelledAt?: boolean
    txHash?: boolean
    lastError?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    marketId?: boolean
    orderType?: boolean
    isLong?: boolean
    size?: boolean
    price?: boolean
    collateral?: boolean
    leverage?: boolean
    isActive?: boolean
    maxSlippageBps?: boolean
    createdAt?: boolean
    positionId?: boolean
    executionPrice?: boolean
    executedAt?: boolean
    cancelledAt?: boolean
    txHash?: boolean
    lastError?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    userId?: boolean
    marketId?: boolean
    orderType?: boolean
    isLong?: boolean
    size?: boolean
    price?: boolean
    collateral?: boolean
    leverage?: boolean
    isActive?: boolean
    maxSlippageBps?: boolean
    createdAt?: boolean
    positionId?: boolean
    executionPrice?: boolean
    executedAt?: boolean
    cancelledAt?: boolean
    txHash?: boolean
    lastError?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "marketId" | "orderType" | "isLong" | "size" | "price" | "collateral" | "leverage" | "isActive" | "maxSlippageBps" | "createdAt" | "positionId" | "executionPrice" | "executedAt" | "cancelledAt" | "txHash" | "lastError", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    trades?: boolean | Order$tradesArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      market: Prisma.$MarketPayload<ExtArgs>
      trades: Prisma.$TradePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      marketId: string
      orderType: number
      isLong: boolean
      size: string
      price: string
      collateral: string
      leverage: number
      isActive: boolean
      maxSlippageBps: number
      createdAt: string
      positionId: string | null
      executionPrice: string | null
      executedAt: string | null
      cancelledAt: string | null
      txHash: string | null
      lastError: string | null
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    market<T extends MarketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MarketDefaultArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trades<T extends Order$tradesArgs<ExtArgs> = {}>(args?: Subset<T, Order$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly marketId: FieldRef<"Order", 'String'>
    readonly orderType: FieldRef<"Order", 'Int'>
    readonly isLong: FieldRef<"Order", 'Boolean'>
    readonly size: FieldRef<"Order", 'String'>
    readonly price: FieldRef<"Order", 'String'>
    readonly collateral: FieldRef<"Order", 'String'>
    readonly leverage: FieldRef<"Order", 'Int'>
    readonly isActive: FieldRef<"Order", 'Boolean'>
    readonly maxSlippageBps: FieldRef<"Order", 'Int'>
    readonly createdAt: FieldRef<"Order", 'String'>
    readonly positionId: FieldRef<"Order", 'String'>
    readonly executionPrice: FieldRef<"Order", 'String'>
    readonly executedAt: FieldRef<"Order", 'String'>
    readonly cancelledAt: FieldRef<"Order", 'String'>
    readonly txHash: FieldRef<"Order", 'String'>
    readonly lastError: FieldRef<"Order", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.trades
   */
  export type Order$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model Trade
   */

  export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  export type TradeAvgAggregateOutputType = {
    size: Decimal | null
    price: Decimal | null
    fee: Decimal | null
  }

  export type TradeSumAggregateOutputType = {
    size: Decimal | null
    price: Decimal | null
    fee: Decimal | null
  }

  export type TradeMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    positionId: string | null
    userId: string | null
    marketId: string | null
    side: $Enums.OrderSide | null
    size: Decimal | null
    price: Decimal | null
    fee: Decimal | null
    txHash: string | null
    createdAt: Date | null
  }

  export type TradeMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    positionId: string | null
    userId: string | null
    marketId: string | null
    side: $Enums.OrderSide | null
    size: Decimal | null
    price: Decimal | null
    fee: Decimal | null
    txHash: string | null
    createdAt: Date | null
  }

  export type TradeCountAggregateOutputType = {
    id: number
    orderId: number
    positionId: number
    userId: number
    marketId: number
    side: number
    size: number
    price: number
    fee: number
    txHash: number
    createdAt: number
    _all: number
  }


  export type TradeAvgAggregateInputType = {
    size?: true
    price?: true
    fee?: true
  }

  export type TradeSumAggregateInputType = {
    size?: true
    price?: true
    fee?: true
  }

  export type TradeMinAggregateInputType = {
    id?: true
    orderId?: true
    positionId?: true
    userId?: true
    marketId?: true
    side?: true
    size?: true
    price?: true
    fee?: true
    txHash?: true
    createdAt?: true
  }

  export type TradeMaxAggregateInputType = {
    id?: true
    orderId?: true
    positionId?: true
    userId?: true
    marketId?: true
    side?: true
    size?: true
    price?: true
    fee?: true
    txHash?: true
    createdAt?: true
  }

  export type TradeCountAggregateInputType = {
    id?: true
    orderId?: true
    positionId?: true
    userId?: true
    marketId?: true
    side?: true
    size?: true
    price?: true
    fee?: true
    txHash?: true
    createdAt?: true
    _all?: true
  }

  export type TradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade to aggregate.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trades
    **/
    _count?: true | TradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeMaxAggregateInputType
  }

  export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade[P]>
      : GetScalarType<T[P], AggregateTrade[P]>
  }




  export type TradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithAggregationInput | TradeOrderByWithAggregationInput[]
    by: TradeScalarFieldEnum[] | TradeScalarFieldEnum
    having?: TradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeCountAggregateInputType | true
    _avg?: TradeAvgAggregateInputType
    _sum?: TradeSumAggregateInputType
    _min?: TradeMinAggregateInputType
    _max?: TradeMaxAggregateInputType
  }

  export type TradeGroupByOutputType = {
    id: string
    orderId: string
    positionId: string
    userId: string
    marketId: string
    side: $Enums.OrderSide
    size: Decimal
    price: Decimal
    fee: Decimal
    txHash: string
    createdAt: Date
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeGroupByOutputType[P]>
            : GetScalarType<T[P], TradeGroupByOutputType[P]>
        }
      >
    >


  export type TradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    positionId?: boolean
    userId?: boolean
    marketId?: boolean
    side?: boolean
    size?: boolean
    price?: boolean
    fee?: boolean
    txHash?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    positionId?: boolean
    userId?: boolean
    marketId?: boolean
    side?: boolean
    size?: boolean
    price?: boolean
    fee?: boolean
    txHash?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    positionId?: boolean
    userId?: boolean
    marketId?: boolean
    side?: boolean
    size?: boolean
    price?: boolean
    fee?: boolean
    txHash?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectScalar = {
    id?: boolean
    orderId?: boolean
    positionId?: boolean
    userId?: boolean
    marketId?: boolean
    side?: boolean
    size?: boolean
    price?: boolean
    fee?: boolean
    txHash?: boolean
    createdAt?: boolean
  }

  export type TradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "positionId" | "userId" | "marketId" | "side" | "size" | "price" | "fee" | "txHash" | "createdAt", ExtArgs["result"]["trade"]>
  export type TradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TradeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      position: Prisma.$PositionPayload<ExtArgs>
      market: Prisma.$MarketPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      positionId: string
      userId: string
      marketId: string
      side: $Enums.OrderSide
      size: Prisma.Decimal
      price: Prisma.Decimal
      fee: Prisma.Decimal
      txHash: string
      createdAt: Date
    }, ExtArgs["result"]["trade"]>
    composites: {}
  }

  type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = $Result.GetResult<Prisma.$TradePayload, S>

  type TradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeCountAggregateInputType | true
    }

  export interface TradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade'], meta: { name: 'Trade' } }
    /**
     * Find zero or one Trade that matches the filter.
     * @param {TradeFindUniqueArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFindUniqueArgs>(args: SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeFindUniqueOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFindFirstArgs>(args?: SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trades
     * const trades = await prisma.trade.findMany()
     * 
     * // Get first 10 Trades
     * const trades = await prisma.trade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeWithIdOnly = await prisma.trade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFindManyArgs>(args?: SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trade.
     * @param {TradeCreateArgs} args - Arguments to create a Trade.
     * @example
     * // Create one Trade
     * const Trade = await prisma.trade.create({
     *   data: {
     *     // ... data to create a Trade
     *   }
     * })
     * 
     */
    create<T extends TradeCreateArgs>(args: SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trades.
     * @param {TradeCreateManyArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeCreateManyArgs>(args?: SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trades and returns the data saved in the database.
     * @param {TradeCreateManyAndReturnArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trade.
     * @param {TradeDeleteArgs} args - Arguments to delete one Trade.
     * @example
     * // Delete one Trade
     * const Trade = await prisma.trade.delete({
     *   where: {
     *     // ... filter to delete one Trade
     *   }
     * })
     * 
     */
    delete<T extends TradeDeleteArgs>(args: SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trade.
     * @param {TradeUpdateArgs} args - Arguments to update one Trade.
     * @example
     * // Update one Trade
     * const trade = await prisma.trade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeUpdateArgs>(args: SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trades.
     * @param {TradeDeleteManyArgs} args - Arguments to filter Trades to delete.
     * @example
     * // Delete a few Trades
     * const { count } = await prisma.trade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDeleteManyArgs>(args?: SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeUpdateManyArgs>(args: SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades and returns the data updated in the database.
     * @param {TradeUpdateManyAndReturnArgs} args - Arguments to update many Trades.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trade.
     * @param {TradeUpsertArgs} args - Arguments to update or create a Trade.
     * @example
     * // Update or create a Trade
     * const trade = await prisma.trade.upsert({
     *   create: {
     *     // ... data to create a Trade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade we want to update
     *   }
     * })
     */
    upsert<T extends TradeUpsertArgs>(args: SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeCountArgs} args - Arguments to filter Trades to count.
     * @example
     * // Count the number of Trades
     * const count = await prisma.trade.count({
     *   where: {
     *     // ... the filter for the Trades we want to count
     *   }
     * })
    **/
    count<T extends TradeCountArgs>(
      args?: Subset<T, TradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeAggregateArgs>(args: Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>

    /**
     * Group by Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeGroupByArgs['orderBy'] }
        : { orderBy?: TradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade model
   */
  readonly fields: TradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    position<T extends PositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PositionDefaultArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    market<T extends MarketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MarketDefaultArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trade model
   */
  interface TradeFieldRefs {
    readonly id: FieldRef<"Trade", 'String'>
    readonly orderId: FieldRef<"Trade", 'String'>
    readonly positionId: FieldRef<"Trade", 'String'>
    readonly userId: FieldRef<"Trade", 'String'>
    readonly marketId: FieldRef<"Trade", 'String'>
    readonly side: FieldRef<"Trade", 'OrderSide'>
    readonly size: FieldRef<"Trade", 'Decimal'>
    readonly price: FieldRef<"Trade", 'Decimal'>
    readonly fee: FieldRef<"Trade", 'Decimal'>
    readonly txHash: FieldRef<"Trade", 'String'>
    readonly createdAt: FieldRef<"Trade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade findUnique
   */
  export type TradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findUniqueOrThrow
   */
  export type TradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findFirst
   */
  export type TradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findFirstOrThrow
   */
  export type TradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findMany
   */
  export type TradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trades to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade create
   */
  export type TradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to create a Trade.
     */
    data: XOR<TradeCreateInput, TradeUncheckedCreateInput>
  }

  /**
   * Trade createMany
   */
  export type TradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trade createManyAndReturn
   */
  export type TradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade update
   */
  export type TradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to update a Trade.
     */
    data: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
    /**
     * Choose, which Trade to update.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade updateMany
   */
  export type TradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
  }

  /**
   * Trade updateManyAndReturn
   */
  export type TradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade upsert
   */
  export type TradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The filter to search for the Trade to update in case it exists.
     */
    where: TradeWhereUniqueInput
    /**
     * In case the Trade found by the `where` argument doesn't exist, create a new Trade with this data.
     */
    create: XOR<TradeCreateInput, TradeUncheckedCreateInput>
    /**
     * In case the Trade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
  }

  /**
   * Trade delete
   */
  export type TradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter which Trade to delete.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade deleteMany
   */
  export type TradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trades to delete
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to delete.
     */
    limit?: number
  }

  /**
   * Trade without action
   */
  export type TradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
  }


  /**
   * Model FundingPayment
   */

  export type AggregateFundingPayment = {
    _count: FundingPaymentCountAggregateOutputType | null
    _avg: FundingPaymentAvgAggregateOutputType | null
    _sum: FundingPaymentSumAggregateOutputType | null
    _min: FundingPaymentMinAggregateOutputType | null
    _max: FundingPaymentMaxAggregateOutputType | null
  }

  export type FundingPaymentAvgAggregateOutputType = {
    amount: Decimal | null
    rate: Decimal | null
    timestamp: number | null
  }

  export type FundingPaymentSumAggregateOutputType = {
    amount: Decimal | null
    rate: Decimal | null
    timestamp: bigint | null
  }

  export type FundingPaymentMinAggregateOutputType = {
    id: string | null
    marketId: string | null
    positionId: string | null
    amount: Decimal | null
    rate: Decimal | null
    timestamp: bigint | null
    txHash: string | null
    createdAt: Date | null
  }

  export type FundingPaymentMaxAggregateOutputType = {
    id: string | null
    marketId: string | null
    positionId: string | null
    amount: Decimal | null
    rate: Decimal | null
    timestamp: bigint | null
    txHash: string | null
    createdAt: Date | null
  }

  export type FundingPaymentCountAggregateOutputType = {
    id: number
    marketId: number
    positionId: number
    amount: number
    rate: number
    timestamp: number
    txHash: number
    createdAt: number
    _all: number
  }


  export type FundingPaymentAvgAggregateInputType = {
    amount?: true
    rate?: true
    timestamp?: true
  }

  export type FundingPaymentSumAggregateInputType = {
    amount?: true
    rate?: true
    timestamp?: true
  }

  export type FundingPaymentMinAggregateInputType = {
    id?: true
    marketId?: true
    positionId?: true
    amount?: true
    rate?: true
    timestamp?: true
    txHash?: true
    createdAt?: true
  }

  export type FundingPaymentMaxAggregateInputType = {
    id?: true
    marketId?: true
    positionId?: true
    amount?: true
    rate?: true
    timestamp?: true
    txHash?: true
    createdAt?: true
  }

  export type FundingPaymentCountAggregateInputType = {
    id?: true
    marketId?: true
    positionId?: true
    amount?: true
    rate?: true
    timestamp?: true
    txHash?: true
    createdAt?: true
    _all?: true
  }

  export type FundingPaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingPayment to aggregate.
     */
    where?: FundingPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPayments to fetch.
     */
    orderBy?: FundingPaymentOrderByWithRelationInput | FundingPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FundingPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FundingPayments
    **/
    _count?: true | FundingPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FundingPaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FundingPaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FundingPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FundingPaymentMaxAggregateInputType
  }

  export type GetFundingPaymentAggregateType<T extends FundingPaymentAggregateArgs> = {
        [P in keyof T & keyof AggregateFundingPayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFundingPayment[P]>
      : GetScalarType<T[P], AggregateFundingPayment[P]>
  }




  export type FundingPaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingPaymentWhereInput
    orderBy?: FundingPaymentOrderByWithAggregationInput | FundingPaymentOrderByWithAggregationInput[]
    by: FundingPaymentScalarFieldEnum[] | FundingPaymentScalarFieldEnum
    having?: FundingPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FundingPaymentCountAggregateInputType | true
    _avg?: FundingPaymentAvgAggregateInputType
    _sum?: FundingPaymentSumAggregateInputType
    _min?: FundingPaymentMinAggregateInputType
    _max?: FundingPaymentMaxAggregateInputType
  }

  export type FundingPaymentGroupByOutputType = {
    id: string
    marketId: string
    positionId: string
    amount: Decimal
    rate: Decimal
    timestamp: bigint
    txHash: string | null
    createdAt: Date
    _count: FundingPaymentCountAggregateOutputType | null
    _avg: FundingPaymentAvgAggregateOutputType | null
    _sum: FundingPaymentSumAggregateOutputType | null
    _min: FundingPaymentMinAggregateOutputType | null
    _max: FundingPaymentMaxAggregateOutputType | null
  }

  type GetFundingPaymentGroupByPayload<T extends FundingPaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FundingPaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FundingPaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FundingPaymentGroupByOutputType[P]>
            : GetScalarType<T[P], FundingPaymentGroupByOutputType[P]>
        }
      >
    >


  export type FundingPaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marketId?: boolean
    positionId?: boolean
    amount?: boolean
    rate?: boolean
    timestamp?: boolean
    txHash?: boolean
    createdAt?: boolean
    market?: boolean | MarketDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingPayment"]>

  export type FundingPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marketId?: boolean
    positionId?: boolean
    amount?: boolean
    rate?: boolean
    timestamp?: boolean
    txHash?: boolean
    createdAt?: boolean
    market?: boolean | MarketDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingPayment"]>

  export type FundingPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marketId?: boolean
    positionId?: boolean
    amount?: boolean
    rate?: boolean
    timestamp?: boolean
    txHash?: boolean
    createdAt?: boolean
    market?: boolean | MarketDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingPayment"]>

  export type FundingPaymentSelectScalar = {
    id?: boolean
    marketId?: boolean
    positionId?: boolean
    amount?: boolean
    rate?: boolean
    timestamp?: boolean
    txHash?: boolean
    createdAt?: boolean
  }

  export type FundingPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "marketId" | "positionId" | "amount" | "rate" | "timestamp" | "txHash" | "createdAt", ExtArgs["result"]["fundingPayment"]>
  export type FundingPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | MarketDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }
  export type FundingPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | MarketDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }
  export type FundingPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | MarketDefaultArgs<ExtArgs>
    position?: boolean | PositionDefaultArgs<ExtArgs>
  }

  export type $FundingPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FundingPayment"
    objects: {
      market: Prisma.$MarketPayload<ExtArgs>
      position: Prisma.$PositionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      marketId: string
      positionId: string
      amount: Prisma.Decimal
      rate: Prisma.Decimal
      timestamp: bigint
      txHash: string | null
      createdAt: Date
    }, ExtArgs["result"]["fundingPayment"]>
    composites: {}
  }

  type FundingPaymentGetPayload<S extends boolean | null | undefined | FundingPaymentDefaultArgs> = $Result.GetResult<Prisma.$FundingPaymentPayload, S>

  type FundingPaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FundingPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FundingPaymentCountAggregateInputType | true
    }

  export interface FundingPaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FundingPayment'], meta: { name: 'FundingPayment' } }
    /**
     * Find zero or one FundingPayment that matches the filter.
     * @param {FundingPaymentFindUniqueArgs} args - Arguments to find a FundingPayment
     * @example
     * // Get one FundingPayment
     * const fundingPayment = await prisma.fundingPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FundingPaymentFindUniqueArgs>(args: SelectSubset<T, FundingPaymentFindUniqueArgs<ExtArgs>>): Prisma__FundingPaymentClient<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FundingPayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FundingPaymentFindUniqueOrThrowArgs} args - Arguments to find a FundingPayment
     * @example
     * // Get one FundingPayment
     * const fundingPayment = await prisma.fundingPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FundingPaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, FundingPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FundingPaymentClient<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FundingPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPaymentFindFirstArgs} args - Arguments to find a FundingPayment
     * @example
     * // Get one FundingPayment
     * const fundingPayment = await prisma.fundingPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FundingPaymentFindFirstArgs>(args?: SelectSubset<T, FundingPaymentFindFirstArgs<ExtArgs>>): Prisma__FundingPaymentClient<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FundingPayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPaymentFindFirstOrThrowArgs} args - Arguments to find a FundingPayment
     * @example
     * // Get one FundingPayment
     * const fundingPayment = await prisma.fundingPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FundingPaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, FundingPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__FundingPaymentClient<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FundingPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FundingPayments
     * const fundingPayments = await prisma.fundingPayment.findMany()
     * 
     * // Get first 10 FundingPayments
     * const fundingPayments = await prisma.fundingPayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fundingPaymentWithIdOnly = await prisma.fundingPayment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FundingPaymentFindManyArgs>(args?: SelectSubset<T, FundingPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FundingPayment.
     * @param {FundingPaymentCreateArgs} args - Arguments to create a FundingPayment.
     * @example
     * // Create one FundingPayment
     * const FundingPayment = await prisma.fundingPayment.create({
     *   data: {
     *     // ... data to create a FundingPayment
     *   }
     * })
     * 
     */
    create<T extends FundingPaymentCreateArgs>(args: SelectSubset<T, FundingPaymentCreateArgs<ExtArgs>>): Prisma__FundingPaymentClient<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FundingPayments.
     * @param {FundingPaymentCreateManyArgs} args - Arguments to create many FundingPayments.
     * @example
     * // Create many FundingPayments
     * const fundingPayment = await prisma.fundingPayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FundingPaymentCreateManyArgs>(args?: SelectSubset<T, FundingPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FundingPayments and returns the data saved in the database.
     * @param {FundingPaymentCreateManyAndReturnArgs} args - Arguments to create many FundingPayments.
     * @example
     * // Create many FundingPayments
     * const fundingPayment = await prisma.fundingPayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FundingPayments and only return the `id`
     * const fundingPaymentWithIdOnly = await prisma.fundingPayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FundingPaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, FundingPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FundingPayment.
     * @param {FundingPaymentDeleteArgs} args - Arguments to delete one FundingPayment.
     * @example
     * // Delete one FundingPayment
     * const FundingPayment = await prisma.fundingPayment.delete({
     *   where: {
     *     // ... filter to delete one FundingPayment
     *   }
     * })
     * 
     */
    delete<T extends FundingPaymentDeleteArgs>(args: SelectSubset<T, FundingPaymentDeleteArgs<ExtArgs>>): Prisma__FundingPaymentClient<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FundingPayment.
     * @param {FundingPaymentUpdateArgs} args - Arguments to update one FundingPayment.
     * @example
     * // Update one FundingPayment
     * const fundingPayment = await prisma.fundingPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FundingPaymentUpdateArgs>(args: SelectSubset<T, FundingPaymentUpdateArgs<ExtArgs>>): Prisma__FundingPaymentClient<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FundingPayments.
     * @param {FundingPaymentDeleteManyArgs} args - Arguments to filter FundingPayments to delete.
     * @example
     * // Delete a few FundingPayments
     * const { count } = await prisma.fundingPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FundingPaymentDeleteManyArgs>(args?: SelectSubset<T, FundingPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FundingPayments
     * const fundingPayment = await prisma.fundingPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FundingPaymentUpdateManyArgs>(args: SelectSubset<T, FundingPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingPayments and returns the data updated in the database.
     * @param {FundingPaymentUpdateManyAndReturnArgs} args - Arguments to update many FundingPayments.
     * @example
     * // Update many FundingPayments
     * const fundingPayment = await prisma.fundingPayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FundingPayments and only return the `id`
     * const fundingPaymentWithIdOnly = await prisma.fundingPayment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FundingPaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, FundingPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FundingPayment.
     * @param {FundingPaymentUpsertArgs} args - Arguments to update or create a FundingPayment.
     * @example
     * // Update or create a FundingPayment
     * const fundingPayment = await prisma.fundingPayment.upsert({
     *   create: {
     *     // ... data to create a FundingPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FundingPayment we want to update
     *   }
     * })
     */
    upsert<T extends FundingPaymentUpsertArgs>(args: SelectSubset<T, FundingPaymentUpsertArgs<ExtArgs>>): Prisma__FundingPaymentClient<$Result.GetResult<Prisma.$FundingPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FundingPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPaymentCountArgs} args - Arguments to filter FundingPayments to count.
     * @example
     * // Count the number of FundingPayments
     * const count = await prisma.fundingPayment.count({
     *   where: {
     *     // ... the filter for the FundingPayments we want to count
     *   }
     * })
    **/
    count<T extends FundingPaymentCountArgs>(
      args?: Subset<T, FundingPaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FundingPaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FundingPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FundingPaymentAggregateArgs>(args: Subset<T, FundingPaymentAggregateArgs>): Prisma.PrismaPromise<GetFundingPaymentAggregateType<T>>

    /**
     * Group by FundingPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingPaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FundingPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FundingPaymentGroupByArgs['orderBy'] }
        : { orderBy?: FundingPaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FundingPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFundingPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FundingPayment model
   */
  readonly fields: FundingPaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FundingPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FundingPaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    market<T extends MarketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MarketDefaultArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    position<T extends PositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PositionDefaultArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FundingPayment model
   */
  interface FundingPaymentFieldRefs {
    readonly id: FieldRef<"FundingPayment", 'String'>
    readonly marketId: FieldRef<"FundingPayment", 'String'>
    readonly positionId: FieldRef<"FundingPayment", 'String'>
    readonly amount: FieldRef<"FundingPayment", 'Decimal'>
    readonly rate: FieldRef<"FundingPayment", 'Decimal'>
    readonly timestamp: FieldRef<"FundingPayment", 'BigInt'>
    readonly txHash: FieldRef<"FundingPayment", 'String'>
    readonly createdAt: FieldRef<"FundingPayment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FundingPayment findUnique
   */
  export type FundingPaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    /**
     * Filter, which FundingPayment to fetch.
     */
    where: FundingPaymentWhereUniqueInput
  }

  /**
   * FundingPayment findUniqueOrThrow
   */
  export type FundingPaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    /**
     * Filter, which FundingPayment to fetch.
     */
    where: FundingPaymentWhereUniqueInput
  }

  /**
   * FundingPayment findFirst
   */
  export type FundingPaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    /**
     * Filter, which FundingPayment to fetch.
     */
    where?: FundingPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPayments to fetch.
     */
    orderBy?: FundingPaymentOrderByWithRelationInput | FundingPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingPayments.
     */
    cursor?: FundingPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingPayments.
     */
    distinct?: FundingPaymentScalarFieldEnum | FundingPaymentScalarFieldEnum[]
  }

  /**
   * FundingPayment findFirstOrThrow
   */
  export type FundingPaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    /**
     * Filter, which FundingPayment to fetch.
     */
    where?: FundingPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPayments to fetch.
     */
    orderBy?: FundingPaymentOrderByWithRelationInput | FundingPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingPayments.
     */
    cursor?: FundingPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingPayments.
     */
    distinct?: FundingPaymentScalarFieldEnum | FundingPaymentScalarFieldEnum[]
  }

  /**
   * FundingPayment findMany
   */
  export type FundingPaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    /**
     * Filter, which FundingPayments to fetch.
     */
    where?: FundingPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPayments to fetch.
     */
    orderBy?: FundingPaymentOrderByWithRelationInput | FundingPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FundingPayments.
     */
    cursor?: FundingPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPayments.
     */
    skip?: number
    distinct?: FundingPaymentScalarFieldEnum | FundingPaymentScalarFieldEnum[]
  }

  /**
   * FundingPayment create
   */
  export type FundingPaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a FundingPayment.
     */
    data: XOR<FundingPaymentCreateInput, FundingPaymentUncheckedCreateInput>
  }

  /**
   * FundingPayment createMany
   */
  export type FundingPaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FundingPayments.
     */
    data: FundingPaymentCreateManyInput | FundingPaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FundingPayment createManyAndReturn
   */
  export type FundingPaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * The data used to create many FundingPayments.
     */
    data: FundingPaymentCreateManyInput | FundingPaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FundingPayment update
   */
  export type FundingPaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a FundingPayment.
     */
    data: XOR<FundingPaymentUpdateInput, FundingPaymentUncheckedUpdateInput>
    /**
     * Choose, which FundingPayment to update.
     */
    where: FundingPaymentWhereUniqueInput
  }

  /**
   * FundingPayment updateMany
   */
  export type FundingPaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FundingPayments.
     */
    data: XOR<FundingPaymentUpdateManyMutationInput, FundingPaymentUncheckedUpdateManyInput>
    /**
     * Filter which FundingPayments to update
     */
    where?: FundingPaymentWhereInput
    /**
     * Limit how many FundingPayments to update.
     */
    limit?: number
  }

  /**
   * FundingPayment updateManyAndReturn
   */
  export type FundingPaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * The data used to update FundingPayments.
     */
    data: XOR<FundingPaymentUpdateManyMutationInput, FundingPaymentUncheckedUpdateManyInput>
    /**
     * Filter which FundingPayments to update
     */
    where?: FundingPaymentWhereInput
    /**
     * Limit how many FundingPayments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FundingPayment upsert
   */
  export type FundingPaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the FundingPayment to update in case it exists.
     */
    where: FundingPaymentWhereUniqueInput
    /**
     * In case the FundingPayment found by the `where` argument doesn't exist, create a new FundingPayment with this data.
     */
    create: XOR<FundingPaymentCreateInput, FundingPaymentUncheckedCreateInput>
    /**
     * In case the FundingPayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FundingPaymentUpdateInput, FundingPaymentUncheckedUpdateInput>
  }

  /**
   * FundingPayment delete
   */
  export type FundingPaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
    /**
     * Filter which FundingPayment to delete.
     */
    where: FundingPaymentWhereUniqueInput
  }

  /**
   * FundingPayment deleteMany
   */
  export type FundingPaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingPayments to delete
     */
    where?: FundingPaymentWhereInput
    /**
     * Limit how many FundingPayments to delete.
     */
    limit?: number
  }

  /**
   * FundingPayment without action
   */
  export type FundingPaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingPayment
     */
    select?: FundingPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingPayment
     */
    omit?: FundingPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingPaymentInclude<ExtArgs> | null
  }


  /**
   * Model Liquidation
   */

  export type AggregateLiquidation = {
    _count: LiquidationCountAggregateOutputType | null
    _avg: LiquidationAvgAggregateOutputType | null
    _sum: LiquidationSumAggregateOutputType | null
    _min: LiquidationMinAggregateOutputType | null
    _max: LiquidationMaxAggregateOutputType | null
  }

  export type LiquidationAvgAggregateOutputType = {
    liquidationPrice: Decimal | null
    collateralReturned: Decimal | null
    fee: Decimal | null
    timestamp: number | null
  }

  export type LiquidationSumAggregateOutputType = {
    liquidationPrice: Decimal | null
    collateralReturned: Decimal | null
    fee: Decimal | null
    timestamp: bigint | null
  }

  export type LiquidationMinAggregateOutputType = {
    id: string | null
    positionId: string | null
    liquidator: string | null
    liquidationPrice: Decimal | null
    collateralReturned: Decimal | null
    fee: Decimal | null
    txHash: string | null
    timestamp: bigint | null
    createdAt: Date | null
    marketId: string | null
  }

  export type LiquidationMaxAggregateOutputType = {
    id: string | null
    positionId: string | null
    liquidator: string | null
    liquidationPrice: Decimal | null
    collateralReturned: Decimal | null
    fee: Decimal | null
    txHash: string | null
    timestamp: bigint | null
    createdAt: Date | null
    marketId: string | null
  }

  export type LiquidationCountAggregateOutputType = {
    id: number
    positionId: number
    liquidator: number
    liquidationPrice: number
    collateralReturned: number
    fee: number
    txHash: number
    timestamp: number
    createdAt: number
    marketId: number
    _all: number
  }


  export type LiquidationAvgAggregateInputType = {
    liquidationPrice?: true
    collateralReturned?: true
    fee?: true
    timestamp?: true
  }

  export type LiquidationSumAggregateInputType = {
    liquidationPrice?: true
    collateralReturned?: true
    fee?: true
    timestamp?: true
  }

  export type LiquidationMinAggregateInputType = {
    id?: true
    positionId?: true
    liquidator?: true
    liquidationPrice?: true
    collateralReturned?: true
    fee?: true
    txHash?: true
    timestamp?: true
    createdAt?: true
    marketId?: true
  }

  export type LiquidationMaxAggregateInputType = {
    id?: true
    positionId?: true
    liquidator?: true
    liquidationPrice?: true
    collateralReturned?: true
    fee?: true
    txHash?: true
    timestamp?: true
    createdAt?: true
    marketId?: true
  }

  export type LiquidationCountAggregateInputType = {
    id?: true
    positionId?: true
    liquidator?: true
    liquidationPrice?: true
    collateralReturned?: true
    fee?: true
    txHash?: true
    timestamp?: true
    createdAt?: true
    marketId?: true
    _all?: true
  }

  export type LiquidationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Liquidation to aggregate.
     */
    where?: LiquidationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Liquidations to fetch.
     */
    orderBy?: LiquidationOrderByWithRelationInput | LiquidationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LiquidationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Liquidations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Liquidations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Liquidations
    **/
    _count?: true | LiquidationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LiquidationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LiquidationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LiquidationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LiquidationMaxAggregateInputType
  }

  export type GetLiquidationAggregateType<T extends LiquidationAggregateArgs> = {
        [P in keyof T & keyof AggregateLiquidation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLiquidation[P]>
      : GetScalarType<T[P], AggregateLiquidation[P]>
  }




  export type LiquidationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiquidationWhereInput
    orderBy?: LiquidationOrderByWithAggregationInput | LiquidationOrderByWithAggregationInput[]
    by: LiquidationScalarFieldEnum[] | LiquidationScalarFieldEnum
    having?: LiquidationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LiquidationCountAggregateInputType | true
    _avg?: LiquidationAvgAggregateInputType
    _sum?: LiquidationSumAggregateInputType
    _min?: LiquidationMinAggregateInputType
    _max?: LiquidationMaxAggregateInputType
  }

  export type LiquidationGroupByOutputType = {
    id: string
    positionId: string
    liquidator: string | null
    liquidationPrice: Decimal
    collateralReturned: Decimal
    fee: Decimal
    txHash: string
    timestamp: bigint
    createdAt: Date
    marketId: string
    _count: LiquidationCountAggregateOutputType | null
    _avg: LiquidationAvgAggregateOutputType | null
    _sum: LiquidationSumAggregateOutputType | null
    _min: LiquidationMinAggregateOutputType | null
    _max: LiquidationMaxAggregateOutputType | null
  }

  type GetLiquidationGroupByPayload<T extends LiquidationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LiquidationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LiquidationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LiquidationGroupByOutputType[P]>
            : GetScalarType<T[P], LiquidationGroupByOutputType[P]>
        }
      >
    >


  export type LiquidationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionId?: boolean
    liquidator?: boolean
    liquidationPrice?: boolean
    collateralReturned?: boolean
    fee?: boolean
    txHash?: boolean
    timestamp?: boolean
    createdAt?: boolean
    marketId?: boolean
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liquidation"]>

  export type LiquidationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionId?: boolean
    liquidator?: boolean
    liquidationPrice?: boolean
    collateralReturned?: boolean
    fee?: boolean
    txHash?: boolean
    timestamp?: boolean
    createdAt?: boolean
    marketId?: boolean
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liquidation"]>

  export type LiquidationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionId?: boolean
    liquidator?: boolean
    liquidationPrice?: boolean
    collateralReturned?: boolean
    fee?: boolean
    txHash?: boolean
    timestamp?: boolean
    createdAt?: boolean
    marketId?: boolean
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liquidation"]>

  export type LiquidationSelectScalar = {
    id?: boolean
    positionId?: boolean
    liquidator?: boolean
    liquidationPrice?: boolean
    collateralReturned?: boolean
    fee?: boolean
    txHash?: boolean
    timestamp?: boolean
    createdAt?: boolean
    marketId?: boolean
  }

  export type LiquidationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "positionId" | "liquidator" | "liquidationPrice" | "collateralReturned" | "fee" | "txHash" | "timestamp" | "createdAt" | "marketId", ExtArgs["result"]["liquidation"]>
  export type LiquidationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }
  export type LiquidationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }
  export type LiquidationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    position?: boolean | PositionDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }

  export type $LiquidationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Liquidation"
    objects: {
      position: Prisma.$PositionPayload<ExtArgs>
      market: Prisma.$MarketPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      positionId: string
      liquidator: string | null
      liquidationPrice: Prisma.Decimal
      collateralReturned: Prisma.Decimal
      fee: Prisma.Decimal
      txHash: string
      timestamp: bigint
      createdAt: Date
      marketId: string
    }, ExtArgs["result"]["liquidation"]>
    composites: {}
  }

  type LiquidationGetPayload<S extends boolean | null | undefined | LiquidationDefaultArgs> = $Result.GetResult<Prisma.$LiquidationPayload, S>

  type LiquidationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LiquidationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LiquidationCountAggregateInputType | true
    }

  export interface LiquidationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Liquidation'], meta: { name: 'Liquidation' } }
    /**
     * Find zero or one Liquidation that matches the filter.
     * @param {LiquidationFindUniqueArgs} args - Arguments to find a Liquidation
     * @example
     * // Get one Liquidation
     * const liquidation = await prisma.liquidation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LiquidationFindUniqueArgs>(args: SelectSubset<T, LiquidationFindUniqueArgs<ExtArgs>>): Prisma__LiquidationClient<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Liquidation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LiquidationFindUniqueOrThrowArgs} args - Arguments to find a Liquidation
     * @example
     * // Get one Liquidation
     * const liquidation = await prisma.liquidation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LiquidationFindUniqueOrThrowArgs>(args: SelectSubset<T, LiquidationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LiquidationClient<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Liquidation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationFindFirstArgs} args - Arguments to find a Liquidation
     * @example
     * // Get one Liquidation
     * const liquidation = await prisma.liquidation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LiquidationFindFirstArgs>(args?: SelectSubset<T, LiquidationFindFirstArgs<ExtArgs>>): Prisma__LiquidationClient<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Liquidation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationFindFirstOrThrowArgs} args - Arguments to find a Liquidation
     * @example
     * // Get one Liquidation
     * const liquidation = await prisma.liquidation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LiquidationFindFirstOrThrowArgs>(args?: SelectSubset<T, LiquidationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LiquidationClient<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Liquidations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Liquidations
     * const liquidations = await prisma.liquidation.findMany()
     * 
     * // Get first 10 Liquidations
     * const liquidations = await prisma.liquidation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const liquidationWithIdOnly = await prisma.liquidation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LiquidationFindManyArgs>(args?: SelectSubset<T, LiquidationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Liquidation.
     * @param {LiquidationCreateArgs} args - Arguments to create a Liquidation.
     * @example
     * // Create one Liquidation
     * const Liquidation = await prisma.liquidation.create({
     *   data: {
     *     // ... data to create a Liquidation
     *   }
     * })
     * 
     */
    create<T extends LiquidationCreateArgs>(args: SelectSubset<T, LiquidationCreateArgs<ExtArgs>>): Prisma__LiquidationClient<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Liquidations.
     * @param {LiquidationCreateManyArgs} args - Arguments to create many Liquidations.
     * @example
     * // Create many Liquidations
     * const liquidation = await prisma.liquidation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LiquidationCreateManyArgs>(args?: SelectSubset<T, LiquidationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Liquidations and returns the data saved in the database.
     * @param {LiquidationCreateManyAndReturnArgs} args - Arguments to create many Liquidations.
     * @example
     * // Create many Liquidations
     * const liquidation = await prisma.liquidation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Liquidations and only return the `id`
     * const liquidationWithIdOnly = await prisma.liquidation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LiquidationCreateManyAndReturnArgs>(args?: SelectSubset<T, LiquidationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Liquidation.
     * @param {LiquidationDeleteArgs} args - Arguments to delete one Liquidation.
     * @example
     * // Delete one Liquidation
     * const Liquidation = await prisma.liquidation.delete({
     *   where: {
     *     // ... filter to delete one Liquidation
     *   }
     * })
     * 
     */
    delete<T extends LiquidationDeleteArgs>(args: SelectSubset<T, LiquidationDeleteArgs<ExtArgs>>): Prisma__LiquidationClient<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Liquidation.
     * @param {LiquidationUpdateArgs} args - Arguments to update one Liquidation.
     * @example
     * // Update one Liquidation
     * const liquidation = await prisma.liquidation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LiquidationUpdateArgs>(args: SelectSubset<T, LiquidationUpdateArgs<ExtArgs>>): Prisma__LiquidationClient<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Liquidations.
     * @param {LiquidationDeleteManyArgs} args - Arguments to filter Liquidations to delete.
     * @example
     * // Delete a few Liquidations
     * const { count } = await prisma.liquidation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LiquidationDeleteManyArgs>(args?: SelectSubset<T, LiquidationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Liquidations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Liquidations
     * const liquidation = await prisma.liquidation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LiquidationUpdateManyArgs>(args: SelectSubset<T, LiquidationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Liquidations and returns the data updated in the database.
     * @param {LiquidationUpdateManyAndReturnArgs} args - Arguments to update many Liquidations.
     * @example
     * // Update many Liquidations
     * const liquidation = await prisma.liquidation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Liquidations and only return the `id`
     * const liquidationWithIdOnly = await prisma.liquidation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LiquidationUpdateManyAndReturnArgs>(args: SelectSubset<T, LiquidationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Liquidation.
     * @param {LiquidationUpsertArgs} args - Arguments to update or create a Liquidation.
     * @example
     * // Update or create a Liquidation
     * const liquidation = await prisma.liquidation.upsert({
     *   create: {
     *     // ... data to create a Liquidation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Liquidation we want to update
     *   }
     * })
     */
    upsert<T extends LiquidationUpsertArgs>(args: SelectSubset<T, LiquidationUpsertArgs<ExtArgs>>): Prisma__LiquidationClient<$Result.GetResult<Prisma.$LiquidationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Liquidations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationCountArgs} args - Arguments to filter Liquidations to count.
     * @example
     * // Count the number of Liquidations
     * const count = await prisma.liquidation.count({
     *   where: {
     *     // ... the filter for the Liquidations we want to count
     *   }
     * })
    **/
    count<T extends LiquidationCountArgs>(
      args?: Subset<T, LiquidationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LiquidationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Liquidation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LiquidationAggregateArgs>(args: Subset<T, LiquidationAggregateArgs>): Prisma.PrismaPromise<GetLiquidationAggregateType<T>>

    /**
     * Group by Liquidation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LiquidationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LiquidationGroupByArgs['orderBy'] }
        : { orderBy?: LiquidationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LiquidationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLiquidationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Liquidation model
   */
  readonly fields: LiquidationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Liquidation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LiquidationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    position<T extends PositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PositionDefaultArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    market<T extends MarketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MarketDefaultArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Liquidation model
   */
  interface LiquidationFieldRefs {
    readonly id: FieldRef<"Liquidation", 'String'>
    readonly positionId: FieldRef<"Liquidation", 'String'>
    readonly liquidator: FieldRef<"Liquidation", 'String'>
    readonly liquidationPrice: FieldRef<"Liquidation", 'Decimal'>
    readonly collateralReturned: FieldRef<"Liquidation", 'Decimal'>
    readonly fee: FieldRef<"Liquidation", 'Decimal'>
    readonly txHash: FieldRef<"Liquidation", 'String'>
    readonly timestamp: FieldRef<"Liquidation", 'BigInt'>
    readonly createdAt: FieldRef<"Liquidation", 'DateTime'>
    readonly marketId: FieldRef<"Liquidation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Liquidation findUnique
   */
  export type LiquidationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    /**
     * Filter, which Liquidation to fetch.
     */
    where: LiquidationWhereUniqueInput
  }

  /**
   * Liquidation findUniqueOrThrow
   */
  export type LiquidationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    /**
     * Filter, which Liquidation to fetch.
     */
    where: LiquidationWhereUniqueInput
  }

  /**
   * Liquidation findFirst
   */
  export type LiquidationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    /**
     * Filter, which Liquidation to fetch.
     */
    where?: LiquidationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Liquidations to fetch.
     */
    orderBy?: LiquidationOrderByWithRelationInput | LiquidationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Liquidations.
     */
    cursor?: LiquidationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Liquidations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Liquidations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Liquidations.
     */
    distinct?: LiquidationScalarFieldEnum | LiquidationScalarFieldEnum[]
  }

  /**
   * Liquidation findFirstOrThrow
   */
  export type LiquidationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    /**
     * Filter, which Liquidation to fetch.
     */
    where?: LiquidationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Liquidations to fetch.
     */
    orderBy?: LiquidationOrderByWithRelationInput | LiquidationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Liquidations.
     */
    cursor?: LiquidationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Liquidations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Liquidations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Liquidations.
     */
    distinct?: LiquidationScalarFieldEnum | LiquidationScalarFieldEnum[]
  }

  /**
   * Liquidation findMany
   */
  export type LiquidationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    /**
     * Filter, which Liquidations to fetch.
     */
    where?: LiquidationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Liquidations to fetch.
     */
    orderBy?: LiquidationOrderByWithRelationInput | LiquidationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Liquidations.
     */
    cursor?: LiquidationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Liquidations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Liquidations.
     */
    skip?: number
    distinct?: LiquidationScalarFieldEnum | LiquidationScalarFieldEnum[]
  }

  /**
   * Liquidation create
   */
  export type LiquidationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    /**
     * The data needed to create a Liquidation.
     */
    data: XOR<LiquidationCreateInput, LiquidationUncheckedCreateInput>
  }

  /**
   * Liquidation createMany
   */
  export type LiquidationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Liquidations.
     */
    data: LiquidationCreateManyInput | LiquidationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Liquidation createManyAndReturn
   */
  export type LiquidationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * The data used to create many Liquidations.
     */
    data: LiquidationCreateManyInput | LiquidationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Liquidation update
   */
  export type LiquidationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    /**
     * The data needed to update a Liquidation.
     */
    data: XOR<LiquidationUpdateInput, LiquidationUncheckedUpdateInput>
    /**
     * Choose, which Liquidation to update.
     */
    where: LiquidationWhereUniqueInput
  }

  /**
   * Liquidation updateMany
   */
  export type LiquidationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Liquidations.
     */
    data: XOR<LiquidationUpdateManyMutationInput, LiquidationUncheckedUpdateManyInput>
    /**
     * Filter which Liquidations to update
     */
    where?: LiquidationWhereInput
    /**
     * Limit how many Liquidations to update.
     */
    limit?: number
  }

  /**
   * Liquidation updateManyAndReturn
   */
  export type LiquidationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * The data used to update Liquidations.
     */
    data: XOR<LiquidationUpdateManyMutationInput, LiquidationUncheckedUpdateManyInput>
    /**
     * Filter which Liquidations to update
     */
    where?: LiquidationWhereInput
    /**
     * Limit how many Liquidations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Liquidation upsert
   */
  export type LiquidationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    /**
     * The filter to search for the Liquidation to update in case it exists.
     */
    where: LiquidationWhereUniqueInput
    /**
     * In case the Liquidation found by the `where` argument doesn't exist, create a new Liquidation with this data.
     */
    create: XOR<LiquidationCreateInput, LiquidationUncheckedCreateInput>
    /**
     * In case the Liquidation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LiquidationUpdateInput, LiquidationUncheckedUpdateInput>
  }

  /**
   * Liquidation delete
   */
  export type LiquidationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
    /**
     * Filter which Liquidation to delete.
     */
    where: LiquidationWhereUniqueInput
  }

  /**
   * Liquidation deleteMany
   */
  export type LiquidationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Liquidations to delete
     */
    where?: LiquidationWhereInput
    /**
     * Limit how many Liquidations to delete.
     */
    limit?: number
  }

  /**
   * Liquidation without action
   */
  export type LiquidationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Liquidation
     */
    select?: LiquidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Liquidation
     */
    omit?: LiquidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiquidationInclude<ExtArgs> | null
  }


  /**
   * Model PriceHistory
   */

  export type AggregatePriceHistory = {
    _count: PriceHistoryCountAggregateOutputType | null
    _avg: PriceHistoryAvgAggregateOutputType | null
    _sum: PriceHistorySumAggregateOutputType | null
    _min: PriceHistoryMinAggregateOutputType | null
    _max: PriceHistoryMaxAggregateOutputType | null
  }

  export type PriceHistoryAvgAggregateOutputType = {
    markPrice: Decimal | null
    indexPrice: Decimal | null
    timestamp: number | null
  }

  export type PriceHistorySumAggregateOutputType = {
    markPrice: Decimal | null
    indexPrice: Decimal | null
    timestamp: bigint | null
  }

  export type PriceHistoryMinAggregateOutputType = {
    id: string | null
    marketId: string | null
    markPrice: Decimal | null
    indexPrice: Decimal | null
    timestamp: bigint | null
    createdAt: Date | null
  }

  export type PriceHistoryMaxAggregateOutputType = {
    id: string | null
    marketId: string | null
    markPrice: Decimal | null
    indexPrice: Decimal | null
    timestamp: bigint | null
    createdAt: Date | null
  }

  export type PriceHistoryCountAggregateOutputType = {
    id: number
    marketId: number
    markPrice: number
    indexPrice: number
    timestamp: number
    createdAt: number
    _all: number
  }


  export type PriceHistoryAvgAggregateInputType = {
    markPrice?: true
    indexPrice?: true
    timestamp?: true
  }

  export type PriceHistorySumAggregateInputType = {
    markPrice?: true
    indexPrice?: true
    timestamp?: true
  }

  export type PriceHistoryMinAggregateInputType = {
    id?: true
    marketId?: true
    markPrice?: true
    indexPrice?: true
    timestamp?: true
    createdAt?: true
  }

  export type PriceHistoryMaxAggregateInputType = {
    id?: true
    marketId?: true
    markPrice?: true
    indexPrice?: true
    timestamp?: true
    createdAt?: true
  }

  export type PriceHistoryCountAggregateInputType = {
    id?: true
    marketId?: true
    markPrice?: true
    indexPrice?: true
    timestamp?: true
    createdAt?: true
    _all?: true
  }

  export type PriceHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceHistory to aggregate.
     */
    where?: PriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceHistories to fetch.
     */
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PriceHistories
    **/
    _count?: true | PriceHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceHistoryMaxAggregateInputType
  }

  export type GetPriceHistoryAggregateType<T extends PriceHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePriceHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriceHistory[P]>
      : GetScalarType<T[P], AggregatePriceHistory[P]>
  }




  export type PriceHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceHistoryWhereInput
    orderBy?: PriceHistoryOrderByWithAggregationInput | PriceHistoryOrderByWithAggregationInput[]
    by: PriceHistoryScalarFieldEnum[] | PriceHistoryScalarFieldEnum
    having?: PriceHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceHistoryCountAggregateInputType | true
    _avg?: PriceHistoryAvgAggregateInputType
    _sum?: PriceHistorySumAggregateInputType
    _min?: PriceHistoryMinAggregateInputType
    _max?: PriceHistoryMaxAggregateInputType
  }

  export type PriceHistoryGroupByOutputType = {
    id: string
    marketId: string
    markPrice: Decimal
    indexPrice: Decimal
    timestamp: bigint
    createdAt: Date
    _count: PriceHistoryCountAggregateOutputType | null
    _avg: PriceHistoryAvgAggregateOutputType | null
    _sum: PriceHistorySumAggregateOutputType | null
    _min: PriceHistoryMinAggregateOutputType | null
    _max: PriceHistoryMaxAggregateOutputType | null
  }

  type GetPriceHistoryGroupByPayload<T extends PriceHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PriceHistoryGroupByOutputType[P]>
        }
      >
    >


  export type PriceHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marketId?: boolean
    markPrice?: boolean
    indexPrice?: boolean
    timestamp?: boolean
    createdAt?: boolean
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceHistory"]>

  export type PriceHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marketId?: boolean
    markPrice?: boolean
    indexPrice?: boolean
    timestamp?: boolean
    createdAt?: boolean
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceHistory"]>

  export type PriceHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marketId?: boolean
    markPrice?: boolean
    indexPrice?: boolean
    timestamp?: boolean
    createdAt?: boolean
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceHistory"]>

  export type PriceHistorySelectScalar = {
    id?: boolean
    marketId?: boolean
    markPrice?: boolean
    indexPrice?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }

  export type PriceHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "marketId" | "markPrice" | "indexPrice" | "timestamp" | "createdAt", ExtArgs["result"]["priceHistory"]>
  export type PriceHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }
  export type PriceHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }
  export type PriceHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }

  export type $PriceHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PriceHistory"
    objects: {
      market: Prisma.$MarketPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      marketId: string
      markPrice: Prisma.Decimal
      indexPrice: Prisma.Decimal
      timestamp: bigint
      createdAt: Date
    }, ExtArgs["result"]["priceHistory"]>
    composites: {}
  }

  type PriceHistoryGetPayload<S extends boolean | null | undefined | PriceHistoryDefaultArgs> = $Result.GetResult<Prisma.$PriceHistoryPayload, S>

  type PriceHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceHistoryCountAggregateInputType | true
    }

  export interface PriceHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PriceHistory'], meta: { name: 'PriceHistory' } }
    /**
     * Find zero or one PriceHistory that matches the filter.
     * @param {PriceHistoryFindUniqueArgs} args - Arguments to find a PriceHistory
     * @example
     * // Get one PriceHistory
     * const priceHistory = await prisma.priceHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceHistoryFindUniqueArgs>(args: SelectSubset<T, PriceHistoryFindUniqueArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PriceHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceHistoryFindUniqueOrThrowArgs} args - Arguments to find a PriceHistory
     * @example
     * // Get one PriceHistory
     * const priceHistory = await prisma.priceHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryFindFirstArgs} args - Arguments to find a PriceHistory
     * @example
     * // Get one PriceHistory
     * const priceHistory = await prisma.priceHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceHistoryFindFirstArgs>(args?: SelectSubset<T, PriceHistoryFindFirstArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryFindFirstOrThrowArgs} args - Arguments to find a PriceHistory
     * @example
     * // Get one PriceHistory
     * const priceHistory = await prisma.priceHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PriceHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PriceHistories
     * const priceHistories = await prisma.priceHistory.findMany()
     * 
     * // Get first 10 PriceHistories
     * const priceHistories = await prisma.priceHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceHistoryWithIdOnly = await prisma.priceHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceHistoryFindManyArgs>(args?: SelectSubset<T, PriceHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PriceHistory.
     * @param {PriceHistoryCreateArgs} args - Arguments to create a PriceHistory.
     * @example
     * // Create one PriceHistory
     * const PriceHistory = await prisma.priceHistory.create({
     *   data: {
     *     // ... data to create a PriceHistory
     *   }
     * })
     * 
     */
    create<T extends PriceHistoryCreateArgs>(args: SelectSubset<T, PriceHistoryCreateArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PriceHistories.
     * @param {PriceHistoryCreateManyArgs} args - Arguments to create many PriceHistories.
     * @example
     * // Create many PriceHistories
     * const priceHistory = await prisma.priceHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceHistoryCreateManyArgs>(args?: SelectSubset<T, PriceHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PriceHistories and returns the data saved in the database.
     * @param {PriceHistoryCreateManyAndReturnArgs} args - Arguments to create many PriceHistories.
     * @example
     * // Create many PriceHistories
     * const priceHistory = await prisma.priceHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PriceHistories and only return the `id`
     * const priceHistoryWithIdOnly = await prisma.priceHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PriceHistory.
     * @param {PriceHistoryDeleteArgs} args - Arguments to delete one PriceHistory.
     * @example
     * // Delete one PriceHistory
     * const PriceHistory = await prisma.priceHistory.delete({
     *   where: {
     *     // ... filter to delete one PriceHistory
     *   }
     * })
     * 
     */
    delete<T extends PriceHistoryDeleteArgs>(args: SelectSubset<T, PriceHistoryDeleteArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PriceHistory.
     * @param {PriceHistoryUpdateArgs} args - Arguments to update one PriceHistory.
     * @example
     * // Update one PriceHistory
     * const priceHistory = await prisma.priceHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceHistoryUpdateArgs>(args: SelectSubset<T, PriceHistoryUpdateArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PriceHistories.
     * @param {PriceHistoryDeleteManyArgs} args - Arguments to filter PriceHistories to delete.
     * @example
     * // Delete a few PriceHistories
     * const { count } = await prisma.priceHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceHistoryDeleteManyArgs>(args?: SelectSubset<T, PriceHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PriceHistories
     * const priceHistory = await prisma.priceHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceHistoryUpdateManyArgs>(args: SelectSubset<T, PriceHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceHistories and returns the data updated in the database.
     * @param {PriceHistoryUpdateManyAndReturnArgs} args - Arguments to update many PriceHistories.
     * @example
     * // Update many PriceHistories
     * const priceHistory = await prisma.priceHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PriceHistories and only return the `id`
     * const priceHistoryWithIdOnly = await prisma.priceHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PriceHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, PriceHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PriceHistory.
     * @param {PriceHistoryUpsertArgs} args - Arguments to update or create a PriceHistory.
     * @example
     * // Update or create a PriceHistory
     * const priceHistory = await prisma.priceHistory.upsert({
     *   create: {
     *     // ... data to create a PriceHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PriceHistory we want to update
     *   }
     * })
     */
    upsert<T extends PriceHistoryUpsertArgs>(args: SelectSubset<T, PriceHistoryUpsertArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PriceHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryCountArgs} args - Arguments to filter PriceHistories to count.
     * @example
     * // Count the number of PriceHistories
     * const count = await prisma.priceHistory.count({
     *   where: {
     *     // ... the filter for the PriceHistories we want to count
     *   }
     * })
    **/
    count<T extends PriceHistoryCountArgs>(
      args?: Subset<T, PriceHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PriceHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceHistoryAggregateArgs>(args: Subset<T, PriceHistoryAggregateArgs>): Prisma.PrismaPromise<GetPriceHistoryAggregateType<T>>

    /**
     * Group by PriceHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceHistoryGroupByArgs['orderBy'] }
        : { orderBy?: PriceHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PriceHistory model
   */
  readonly fields: PriceHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PriceHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    market<T extends MarketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MarketDefaultArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PriceHistory model
   */
  interface PriceHistoryFieldRefs {
    readonly id: FieldRef<"PriceHistory", 'String'>
    readonly marketId: FieldRef<"PriceHistory", 'String'>
    readonly markPrice: FieldRef<"PriceHistory", 'Decimal'>
    readonly indexPrice: FieldRef<"PriceHistory", 'Decimal'>
    readonly timestamp: FieldRef<"PriceHistory", 'BigInt'>
    readonly createdAt: FieldRef<"PriceHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PriceHistory findUnique
   */
  export type PriceHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistory to fetch.
     */
    where: PriceHistoryWhereUniqueInput
  }

  /**
   * PriceHistory findUniqueOrThrow
   */
  export type PriceHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistory to fetch.
     */
    where: PriceHistoryWhereUniqueInput
  }

  /**
   * PriceHistory findFirst
   */
  export type PriceHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistory to fetch.
     */
    where?: PriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceHistories to fetch.
     */
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceHistories.
     */
    cursor?: PriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceHistories.
     */
    distinct?: PriceHistoryScalarFieldEnum | PriceHistoryScalarFieldEnum[]
  }

  /**
   * PriceHistory findFirstOrThrow
   */
  export type PriceHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistory to fetch.
     */
    where?: PriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceHistories to fetch.
     */
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceHistories.
     */
    cursor?: PriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceHistories.
     */
    distinct?: PriceHistoryScalarFieldEnum | PriceHistoryScalarFieldEnum[]
  }

  /**
   * PriceHistory findMany
   */
  export type PriceHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistories to fetch.
     */
    where?: PriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceHistories to fetch.
     */
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PriceHistories.
     */
    cursor?: PriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceHistories.
     */
    skip?: number
    distinct?: PriceHistoryScalarFieldEnum | PriceHistoryScalarFieldEnum[]
  }

  /**
   * PriceHistory create
   */
  export type PriceHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PriceHistory.
     */
    data: XOR<PriceHistoryCreateInput, PriceHistoryUncheckedCreateInput>
  }

  /**
   * PriceHistory createMany
   */
  export type PriceHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PriceHistories.
     */
    data: PriceHistoryCreateManyInput | PriceHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PriceHistory createManyAndReturn
   */
  export type PriceHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many PriceHistories.
     */
    data: PriceHistoryCreateManyInput | PriceHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceHistory update
   */
  export type PriceHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PriceHistory.
     */
    data: XOR<PriceHistoryUpdateInput, PriceHistoryUncheckedUpdateInput>
    /**
     * Choose, which PriceHistory to update.
     */
    where: PriceHistoryWhereUniqueInput
  }

  /**
   * PriceHistory updateMany
   */
  export type PriceHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PriceHistories.
     */
    data: XOR<PriceHistoryUpdateManyMutationInput, PriceHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PriceHistories to update
     */
    where?: PriceHistoryWhereInput
    /**
     * Limit how many PriceHistories to update.
     */
    limit?: number
  }

  /**
   * PriceHistory updateManyAndReturn
   */
  export type PriceHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * The data used to update PriceHistories.
     */
    data: XOR<PriceHistoryUpdateManyMutationInput, PriceHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PriceHistories to update
     */
    where?: PriceHistoryWhereInput
    /**
     * Limit how many PriceHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceHistory upsert
   */
  export type PriceHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PriceHistory to update in case it exists.
     */
    where: PriceHistoryWhereUniqueInput
    /**
     * In case the PriceHistory found by the `where` argument doesn't exist, create a new PriceHistory with this data.
     */
    create: XOR<PriceHistoryCreateInput, PriceHistoryUncheckedCreateInput>
    /**
     * In case the PriceHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceHistoryUpdateInput, PriceHistoryUncheckedUpdateInput>
  }

  /**
   * PriceHistory delete
   */
  export type PriceHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter which PriceHistory to delete.
     */
    where: PriceHistoryWhereUniqueInput
  }

  /**
   * PriceHistory deleteMany
   */
  export type PriceHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceHistories to delete
     */
    where?: PriceHistoryWhereInput
    /**
     * Limit how many PriceHistories to delete.
     */
    limit?: number
  }

  /**
   * PriceHistory without action
   */
  export type PriceHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceHistory
     */
    omit?: PriceHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
  }


  /**
   * Model SystemHealth
   */

  export type AggregateSystemHealth = {
    _count: SystemHealthCountAggregateOutputType | null
    _min: SystemHealthMinAggregateOutputType | null
    _max: SystemHealthMaxAggregateOutputType | null
  }

  export type SystemHealthMinAggregateOutputType = {
    id: string | null
    component: string | null
    status: string | null
    metrics: string | null
    timestamp: string | null
  }

  export type SystemHealthMaxAggregateOutputType = {
    id: string | null
    component: string | null
    status: string | null
    metrics: string | null
    timestamp: string | null
  }

  export type SystemHealthCountAggregateOutputType = {
    id: number
    component: number
    status: number
    metrics: number
    timestamp: number
    _all: number
  }


  export type SystemHealthMinAggregateInputType = {
    id?: true
    component?: true
    status?: true
    metrics?: true
    timestamp?: true
  }

  export type SystemHealthMaxAggregateInputType = {
    id?: true
    component?: true
    status?: true
    metrics?: true
    timestamp?: true
  }

  export type SystemHealthCountAggregateInputType = {
    id?: true
    component?: true
    status?: true
    metrics?: true
    timestamp?: true
    _all?: true
  }

  export type SystemHealthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemHealth to aggregate.
     */
    where?: SystemHealthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemHealths to fetch.
     */
    orderBy?: SystemHealthOrderByWithRelationInput | SystemHealthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemHealthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemHealths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemHealths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemHealths
    **/
    _count?: true | SystemHealthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemHealthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemHealthMaxAggregateInputType
  }

  export type GetSystemHealthAggregateType<T extends SystemHealthAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemHealth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemHealth[P]>
      : GetScalarType<T[P], AggregateSystemHealth[P]>
  }




  export type SystemHealthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemHealthWhereInput
    orderBy?: SystemHealthOrderByWithAggregationInput | SystemHealthOrderByWithAggregationInput[]
    by: SystemHealthScalarFieldEnum[] | SystemHealthScalarFieldEnum
    having?: SystemHealthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemHealthCountAggregateInputType | true
    _min?: SystemHealthMinAggregateInputType
    _max?: SystemHealthMaxAggregateInputType
  }

  export type SystemHealthGroupByOutputType = {
    id: string
    component: string
    status: string
    metrics: string
    timestamp: string
    _count: SystemHealthCountAggregateOutputType | null
    _min: SystemHealthMinAggregateOutputType | null
    _max: SystemHealthMaxAggregateOutputType | null
  }

  type GetSystemHealthGroupByPayload<T extends SystemHealthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemHealthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemHealthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemHealthGroupByOutputType[P]>
            : GetScalarType<T[P], SystemHealthGroupByOutputType[P]>
        }
      >
    >


  export type SystemHealthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    component?: boolean
    status?: boolean
    metrics?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["systemHealth"]>

  export type SystemHealthSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    component?: boolean
    status?: boolean
    metrics?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["systemHealth"]>

  export type SystemHealthSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    component?: boolean
    status?: boolean
    metrics?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["systemHealth"]>

  export type SystemHealthSelectScalar = {
    id?: boolean
    component?: boolean
    status?: boolean
    metrics?: boolean
    timestamp?: boolean
  }

  export type SystemHealthOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "component" | "status" | "metrics" | "timestamp", ExtArgs["result"]["systemHealth"]>

  export type $SystemHealthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemHealth"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      component: string
      status: string
      metrics: string
      timestamp: string
    }, ExtArgs["result"]["systemHealth"]>
    composites: {}
  }

  type SystemHealthGetPayload<S extends boolean | null | undefined | SystemHealthDefaultArgs> = $Result.GetResult<Prisma.$SystemHealthPayload, S>

  type SystemHealthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemHealthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemHealthCountAggregateInputType | true
    }

  export interface SystemHealthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemHealth'], meta: { name: 'SystemHealth' } }
    /**
     * Find zero or one SystemHealth that matches the filter.
     * @param {SystemHealthFindUniqueArgs} args - Arguments to find a SystemHealth
     * @example
     * // Get one SystemHealth
     * const systemHealth = await prisma.systemHealth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemHealthFindUniqueArgs>(args: SelectSubset<T, SystemHealthFindUniqueArgs<ExtArgs>>): Prisma__SystemHealthClient<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemHealth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemHealthFindUniqueOrThrowArgs} args - Arguments to find a SystemHealth
     * @example
     * // Get one SystemHealth
     * const systemHealth = await prisma.systemHealth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemHealthFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemHealthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemHealthClient<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemHealth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemHealthFindFirstArgs} args - Arguments to find a SystemHealth
     * @example
     * // Get one SystemHealth
     * const systemHealth = await prisma.systemHealth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemHealthFindFirstArgs>(args?: SelectSubset<T, SystemHealthFindFirstArgs<ExtArgs>>): Prisma__SystemHealthClient<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemHealth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemHealthFindFirstOrThrowArgs} args - Arguments to find a SystemHealth
     * @example
     * // Get one SystemHealth
     * const systemHealth = await prisma.systemHealth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemHealthFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemHealthFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemHealthClient<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemHealths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemHealthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemHealths
     * const systemHealths = await prisma.systemHealth.findMany()
     * 
     * // Get first 10 SystemHealths
     * const systemHealths = await prisma.systemHealth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemHealthWithIdOnly = await prisma.systemHealth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemHealthFindManyArgs>(args?: SelectSubset<T, SystemHealthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemHealth.
     * @param {SystemHealthCreateArgs} args - Arguments to create a SystemHealth.
     * @example
     * // Create one SystemHealth
     * const SystemHealth = await prisma.systemHealth.create({
     *   data: {
     *     // ... data to create a SystemHealth
     *   }
     * })
     * 
     */
    create<T extends SystemHealthCreateArgs>(args: SelectSubset<T, SystemHealthCreateArgs<ExtArgs>>): Prisma__SystemHealthClient<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemHealths.
     * @param {SystemHealthCreateManyArgs} args - Arguments to create many SystemHealths.
     * @example
     * // Create many SystemHealths
     * const systemHealth = await prisma.systemHealth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemHealthCreateManyArgs>(args?: SelectSubset<T, SystemHealthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemHealths and returns the data saved in the database.
     * @param {SystemHealthCreateManyAndReturnArgs} args - Arguments to create many SystemHealths.
     * @example
     * // Create many SystemHealths
     * const systemHealth = await prisma.systemHealth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemHealths and only return the `id`
     * const systemHealthWithIdOnly = await prisma.systemHealth.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemHealthCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemHealthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemHealth.
     * @param {SystemHealthDeleteArgs} args - Arguments to delete one SystemHealth.
     * @example
     * // Delete one SystemHealth
     * const SystemHealth = await prisma.systemHealth.delete({
     *   where: {
     *     // ... filter to delete one SystemHealth
     *   }
     * })
     * 
     */
    delete<T extends SystemHealthDeleteArgs>(args: SelectSubset<T, SystemHealthDeleteArgs<ExtArgs>>): Prisma__SystemHealthClient<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemHealth.
     * @param {SystemHealthUpdateArgs} args - Arguments to update one SystemHealth.
     * @example
     * // Update one SystemHealth
     * const systemHealth = await prisma.systemHealth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemHealthUpdateArgs>(args: SelectSubset<T, SystemHealthUpdateArgs<ExtArgs>>): Prisma__SystemHealthClient<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemHealths.
     * @param {SystemHealthDeleteManyArgs} args - Arguments to filter SystemHealths to delete.
     * @example
     * // Delete a few SystemHealths
     * const { count } = await prisma.systemHealth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemHealthDeleteManyArgs>(args?: SelectSubset<T, SystemHealthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemHealths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemHealthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemHealths
     * const systemHealth = await prisma.systemHealth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemHealthUpdateManyArgs>(args: SelectSubset<T, SystemHealthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemHealths and returns the data updated in the database.
     * @param {SystemHealthUpdateManyAndReturnArgs} args - Arguments to update many SystemHealths.
     * @example
     * // Update many SystemHealths
     * const systemHealth = await prisma.systemHealth.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemHealths and only return the `id`
     * const systemHealthWithIdOnly = await prisma.systemHealth.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemHealthUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemHealthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemHealth.
     * @param {SystemHealthUpsertArgs} args - Arguments to update or create a SystemHealth.
     * @example
     * // Update or create a SystemHealth
     * const systemHealth = await prisma.systemHealth.upsert({
     *   create: {
     *     // ... data to create a SystemHealth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemHealth we want to update
     *   }
     * })
     */
    upsert<T extends SystemHealthUpsertArgs>(args: SelectSubset<T, SystemHealthUpsertArgs<ExtArgs>>): Prisma__SystemHealthClient<$Result.GetResult<Prisma.$SystemHealthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemHealths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemHealthCountArgs} args - Arguments to filter SystemHealths to count.
     * @example
     * // Count the number of SystemHealths
     * const count = await prisma.systemHealth.count({
     *   where: {
     *     // ... the filter for the SystemHealths we want to count
     *   }
     * })
    **/
    count<T extends SystemHealthCountArgs>(
      args?: Subset<T, SystemHealthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemHealthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemHealth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemHealthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemHealthAggregateArgs>(args: Subset<T, SystemHealthAggregateArgs>): Prisma.PrismaPromise<GetSystemHealthAggregateType<T>>

    /**
     * Group by SystemHealth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemHealthGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemHealthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemHealthGroupByArgs['orderBy'] }
        : { orderBy?: SystemHealthGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemHealthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemHealthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemHealth model
   */
  readonly fields: SystemHealthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemHealth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemHealthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemHealth model
   */
  interface SystemHealthFieldRefs {
    readonly id: FieldRef<"SystemHealth", 'String'>
    readonly component: FieldRef<"SystemHealth", 'String'>
    readonly status: FieldRef<"SystemHealth", 'String'>
    readonly metrics: FieldRef<"SystemHealth", 'String'>
    readonly timestamp: FieldRef<"SystemHealth", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SystemHealth findUnique
   */
  export type SystemHealthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * Filter, which SystemHealth to fetch.
     */
    where: SystemHealthWhereUniqueInput
  }

  /**
   * SystemHealth findUniqueOrThrow
   */
  export type SystemHealthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * Filter, which SystemHealth to fetch.
     */
    where: SystemHealthWhereUniqueInput
  }

  /**
   * SystemHealth findFirst
   */
  export type SystemHealthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * Filter, which SystemHealth to fetch.
     */
    where?: SystemHealthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemHealths to fetch.
     */
    orderBy?: SystemHealthOrderByWithRelationInput | SystemHealthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemHealths.
     */
    cursor?: SystemHealthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemHealths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemHealths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemHealths.
     */
    distinct?: SystemHealthScalarFieldEnum | SystemHealthScalarFieldEnum[]
  }

  /**
   * SystemHealth findFirstOrThrow
   */
  export type SystemHealthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * Filter, which SystemHealth to fetch.
     */
    where?: SystemHealthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemHealths to fetch.
     */
    orderBy?: SystemHealthOrderByWithRelationInput | SystemHealthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemHealths.
     */
    cursor?: SystemHealthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemHealths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemHealths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemHealths.
     */
    distinct?: SystemHealthScalarFieldEnum | SystemHealthScalarFieldEnum[]
  }

  /**
   * SystemHealth findMany
   */
  export type SystemHealthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * Filter, which SystemHealths to fetch.
     */
    where?: SystemHealthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemHealths to fetch.
     */
    orderBy?: SystemHealthOrderByWithRelationInput | SystemHealthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemHealths.
     */
    cursor?: SystemHealthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemHealths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemHealths.
     */
    skip?: number
    distinct?: SystemHealthScalarFieldEnum | SystemHealthScalarFieldEnum[]
  }

  /**
   * SystemHealth create
   */
  export type SystemHealthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemHealth.
     */
    data: XOR<SystemHealthCreateInput, SystemHealthUncheckedCreateInput>
  }

  /**
   * SystemHealth createMany
   */
  export type SystemHealthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemHealths.
     */
    data: SystemHealthCreateManyInput | SystemHealthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemHealth createManyAndReturn
   */
  export type SystemHealthCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * The data used to create many SystemHealths.
     */
    data: SystemHealthCreateManyInput | SystemHealthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemHealth update
   */
  export type SystemHealthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemHealth.
     */
    data: XOR<SystemHealthUpdateInput, SystemHealthUncheckedUpdateInput>
    /**
     * Choose, which SystemHealth to update.
     */
    where: SystemHealthWhereUniqueInput
  }

  /**
   * SystemHealth updateMany
   */
  export type SystemHealthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemHealths.
     */
    data: XOR<SystemHealthUpdateManyMutationInput, SystemHealthUncheckedUpdateManyInput>
    /**
     * Filter which SystemHealths to update
     */
    where?: SystemHealthWhereInput
    /**
     * Limit how many SystemHealths to update.
     */
    limit?: number
  }

  /**
   * SystemHealth updateManyAndReturn
   */
  export type SystemHealthUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * The data used to update SystemHealths.
     */
    data: XOR<SystemHealthUpdateManyMutationInput, SystemHealthUncheckedUpdateManyInput>
    /**
     * Filter which SystemHealths to update
     */
    where?: SystemHealthWhereInput
    /**
     * Limit how many SystemHealths to update.
     */
    limit?: number
  }

  /**
   * SystemHealth upsert
   */
  export type SystemHealthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemHealth to update in case it exists.
     */
    where: SystemHealthWhereUniqueInput
    /**
     * In case the SystemHealth found by the `where` argument doesn't exist, create a new SystemHealth with this data.
     */
    create: XOR<SystemHealthCreateInput, SystemHealthUncheckedCreateInput>
    /**
     * In case the SystemHealth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemHealthUpdateInput, SystemHealthUncheckedUpdateInput>
  }

  /**
   * SystemHealth delete
   */
  export type SystemHealthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
    /**
     * Filter which SystemHealth to delete.
     */
    where: SystemHealthWhereUniqueInput
  }

  /**
   * SystemHealth deleteMany
   */
  export type SystemHealthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemHealths to delete
     */
    where?: SystemHealthWhereInput
    /**
     * Limit how many SystemHealths to delete.
     */
    limit?: number
  }

  /**
   * SystemHealth without action
   */
  export type SystemHealthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemHealth
     */
    select?: SystemHealthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemHealth
     */
    omit?: SystemHealthOmit<ExtArgs> | null
  }


  /**
   * Model LiquidationAttempt
   */

  export type AggregateLiquidationAttempt = {
    _count: LiquidationAttemptCountAggregateOutputType | null
    _min: LiquidationAttemptMinAggregateOutputType | null
    _max: LiquidationAttemptMaxAggregateOutputType | null
  }

  export type LiquidationAttemptMinAggregateOutputType = {
    id: string | null
    positionId: string | null
    marketId: string | null
    timestamp: string | null
    currentPrice: string | null
    liquidationPrice: string | null
    status: string | null
  }

  export type LiquidationAttemptMaxAggregateOutputType = {
    id: string | null
    positionId: string | null
    marketId: string | null
    timestamp: string | null
    currentPrice: string | null
    liquidationPrice: string | null
    status: string | null
  }

  export type LiquidationAttemptCountAggregateOutputType = {
    id: number
    positionId: number
    marketId: number
    timestamp: number
    currentPrice: number
    liquidationPrice: number
    status: number
    _all: number
  }


  export type LiquidationAttemptMinAggregateInputType = {
    id?: true
    positionId?: true
    marketId?: true
    timestamp?: true
    currentPrice?: true
    liquidationPrice?: true
    status?: true
  }

  export type LiquidationAttemptMaxAggregateInputType = {
    id?: true
    positionId?: true
    marketId?: true
    timestamp?: true
    currentPrice?: true
    liquidationPrice?: true
    status?: true
  }

  export type LiquidationAttemptCountAggregateInputType = {
    id?: true
    positionId?: true
    marketId?: true
    timestamp?: true
    currentPrice?: true
    liquidationPrice?: true
    status?: true
    _all?: true
  }

  export type LiquidationAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiquidationAttempt to aggregate.
     */
    where?: LiquidationAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiquidationAttempts to fetch.
     */
    orderBy?: LiquidationAttemptOrderByWithRelationInput | LiquidationAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LiquidationAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiquidationAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiquidationAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LiquidationAttempts
    **/
    _count?: true | LiquidationAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LiquidationAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LiquidationAttemptMaxAggregateInputType
  }

  export type GetLiquidationAttemptAggregateType<T extends LiquidationAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateLiquidationAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLiquidationAttempt[P]>
      : GetScalarType<T[P], AggregateLiquidationAttempt[P]>
  }




  export type LiquidationAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiquidationAttemptWhereInput
    orderBy?: LiquidationAttemptOrderByWithAggregationInput | LiquidationAttemptOrderByWithAggregationInput[]
    by: LiquidationAttemptScalarFieldEnum[] | LiquidationAttemptScalarFieldEnum
    having?: LiquidationAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LiquidationAttemptCountAggregateInputType | true
    _min?: LiquidationAttemptMinAggregateInputType
    _max?: LiquidationAttemptMaxAggregateInputType
  }

  export type LiquidationAttemptGroupByOutputType = {
    id: string
    positionId: string
    marketId: string
    timestamp: string
    currentPrice: string
    liquidationPrice: string
    status: string
    _count: LiquidationAttemptCountAggregateOutputType | null
    _min: LiquidationAttemptMinAggregateOutputType | null
    _max: LiquidationAttemptMaxAggregateOutputType | null
  }

  type GetLiquidationAttemptGroupByPayload<T extends LiquidationAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LiquidationAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LiquidationAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LiquidationAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], LiquidationAttemptGroupByOutputType[P]>
        }
      >
    >


  export type LiquidationAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionId?: boolean
    marketId?: boolean
    timestamp?: boolean
    currentPrice?: boolean
    liquidationPrice?: boolean
    status?: boolean
  }, ExtArgs["result"]["liquidationAttempt"]>

  export type LiquidationAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionId?: boolean
    marketId?: boolean
    timestamp?: boolean
    currentPrice?: boolean
    liquidationPrice?: boolean
    status?: boolean
  }, ExtArgs["result"]["liquidationAttempt"]>

  export type LiquidationAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    positionId?: boolean
    marketId?: boolean
    timestamp?: boolean
    currentPrice?: boolean
    liquidationPrice?: boolean
    status?: boolean
  }, ExtArgs["result"]["liquidationAttempt"]>

  export type LiquidationAttemptSelectScalar = {
    id?: boolean
    positionId?: boolean
    marketId?: boolean
    timestamp?: boolean
    currentPrice?: boolean
    liquidationPrice?: boolean
    status?: boolean
  }

  export type LiquidationAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "positionId" | "marketId" | "timestamp" | "currentPrice" | "liquidationPrice" | "status", ExtArgs["result"]["liquidationAttempt"]>

  export type $LiquidationAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LiquidationAttempt"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      positionId: string
      marketId: string
      timestamp: string
      currentPrice: string
      liquidationPrice: string
      status: string
    }, ExtArgs["result"]["liquidationAttempt"]>
    composites: {}
  }

  type LiquidationAttemptGetPayload<S extends boolean | null | undefined | LiquidationAttemptDefaultArgs> = $Result.GetResult<Prisma.$LiquidationAttemptPayload, S>

  type LiquidationAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LiquidationAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LiquidationAttemptCountAggregateInputType | true
    }

  export interface LiquidationAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LiquidationAttempt'], meta: { name: 'LiquidationAttempt' } }
    /**
     * Find zero or one LiquidationAttempt that matches the filter.
     * @param {LiquidationAttemptFindUniqueArgs} args - Arguments to find a LiquidationAttempt
     * @example
     * // Get one LiquidationAttempt
     * const liquidationAttempt = await prisma.liquidationAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LiquidationAttemptFindUniqueArgs>(args: SelectSubset<T, LiquidationAttemptFindUniqueArgs<ExtArgs>>): Prisma__LiquidationAttemptClient<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LiquidationAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LiquidationAttemptFindUniqueOrThrowArgs} args - Arguments to find a LiquidationAttempt
     * @example
     * // Get one LiquidationAttempt
     * const liquidationAttempt = await prisma.liquidationAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LiquidationAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, LiquidationAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LiquidationAttemptClient<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiquidationAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationAttemptFindFirstArgs} args - Arguments to find a LiquidationAttempt
     * @example
     * // Get one LiquidationAttempt
     * const liquidationAttempt = await prisma.liquidationAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LiquidationAttemptFindFirstArgs>(args?: SelectSubset<T, LiquidationAttemptFindFirstArgs<ExtArgs>>): Prisma__LiquidationAttemptClient<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiquidationAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationAttemptFindFirstOrThrowArgs} args - Arguments to find a LiquidationAttempt
     * @example
     * // Get one LiquidationAttempt
     * const liquidationAttempt = await prisma.liquidationAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LiquidationAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, LiquidationAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__LiquidationAttemptClient<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LiquidationAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LiquidationAttempts
     * const liquidationAttempts = await prisma.liquidationAttempt.findMany()
     * 
     * // Get first 10 LiquidationAttempts
     * const liquidationAttempts = await prisma.liquidationAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const liquidationAttemptWithIdOnly = await prisma.liquidationAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LiquidationAttemptFindManyArgs>(args?: SelectSubset<T, LiquidationAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LiquidationAttempt.
     * @param {LiquidationAttemptCreateArgs} args - Arguments to create a LiquidationAttempt.
     * @example
     * // Create one LiquidationAttempt
     * const LiquidationAttempt = await prisma.liquidationAttempt.create({
     *   data: {
     *     // ... data to create a LiquidationAttempt
     *   }
     * })
     * 
     */
    create<T extends LiquidationAttemptCreateArgs>(args: SelectSubset<T, LiquidationAttemptCreateArgs<ExtArgs>>): Prisma__LiquidationAttemptClient<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LiquidationAttempts.
     * @param {LiquidationAttemptCreateManyArgs} args - Arguments to create many LiquidationAttempts.
     * @example
     * // Create many LiquidationAttempts
     * const liquidationAttempt = await prisma.liquidationAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LiquidationAttemptCreateManyArgs>(args?: SelectSubset<T, LiquidationAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LiquidationAttempts and returns the data saved in the database.
     * @param {LiquidationAttemptCreateManyAndReturnArgs} args - Arguments to create many LiquidationAttempts.
     * @example
     * // Create many LiquidationAttempts
     * const liquidationAttempt = await prisma.liquidationAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LiquidationAttempts and only return the `id`
     * const liquidationAttemptWithIdOnly = await prisma.liquidationAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LiquidationAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, LiquidationAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LiquidationAttempt.
     * @param {LiquidationAttemptDeleteArgs} args - Arguments to delete one LiquidationAttempt.
     * @example
     * // Delete one LiquidationAttempt
     * const LiquidationAttempt = await prisma.liquidationAttempt.delete({
     *   where: {
     *     // ... filter to delete one LiquidationAttempt
     *   }
     * })
     * 
     */
    delete<T extends LiquidationAttemptDeleteArgs>(args: SelectSubset<T, LiquidationAttemptDeleteArgs<ExtArgs>>): Prisma__LiquidationAttemptClient<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LiquidationAttempt.
     * @param {LiquidationAttemptUpdateArgs} args - Arguments to update one LiquidationAttempt.
     * @example
     * // Update one LiquidationAttempt
     * const liquidationAttempt = await prisma.liquidationAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LiquidationAttemptUpdateArgs>(args: SelectSubset<T, LiquidationAttemptUpdateArgs<ExtArgs>>): Prisma__LiquidationAttemptClient<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LiquidationAttempts.
     * @param {LiquidationAttemptDeleteManyArgs} args - Arguments to filter LiquidationAttempts to delete.
     * @example
     * // Delete a few LiquidationAttempts
     * const { count } = await prisma.liquidationAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LiquidationAttemptDeleteManyArgs>(args?: SelectSubset<T, LiquidationAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiquidationAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LiquidationAttempts
     * const liquidationAttempt = await prisma.liquidationAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LiquidationAttemptUpdateManyArgs>(args: SelectSubset<T, LiquidationAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiquidationAttempts and returns the data updated in the database.
     * @param {LiquidationAttemptUpdateManyAndReturnArgs} args - Arguments to update many LiquidationAttempts.
     * @example
     * // Update many LiquidationAttempts
     * const liquidationAttempt = await prisma.liquidationAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LiquidationAttempts and only return the `id`
     * const liquidationAttemptWithIdOnly = await prisma.liquidationAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LiquidationAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, LiquidationAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LiquidationAttempt.
     * @param {LiquidationAttemptUpsertArgs} args - Arguments to update or create a LiquidationAttempt.
     * @example
     * // Update or create a LiquidationAttempt
     * const liquidationAttempt = await prisma.liquidationAttempt.upsert({
     *   create: {
     *     // ... data to create a LiquidationAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LiquidationAttempt we want to update
     *   }
     * })
     */
    upsert<T extends LiquidationAttemptUpsertArgs>(args: SelectSubset<T, LiquidationAttemptUpsertArgs<ExtArgs>>): Prisma__LiquidationAttemptClient<$Result.GetResult<Prisma.$LiquidationAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LiquidationAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationAttemptCountArgs} args - Arguments to filter LiquidationAttempts to count.
     * @example
     * // Count the number of LiquidationAttempts
     * const count = await prisma.liquidationAttempt.count({
     *   where: {
     *     // ... the filter for the LiquidationAttempts we want to count
     *   }
     * })
    **/
    count<T extends LiquidationAttemptCountArgs>(
      args?: Subset<T, LiquidationAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LiquidationAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LiquidationAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LiquidationAttemptAggregateArgs>(args: Subset<T, LiquidationAttemptAggregateArgs>): Prisma.PrismaPromise<GetLiquidationAttemptAggregateType<T>>

    /**
     * Group by LiquidationAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiquidationAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LiquidationAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LiquidationAttemptGroupByArgs['orderBy'] }
        : { orderBy?: LiquidationAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LiquidationAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLiquidationAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LiquidationAttempt model
   */
  readonly fields: LiquidationAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LiquidationAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LiquidationAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LiquidationAttempt model
   */
  interface LiquidationAttemptFieldRefs {
    readonly id: FieldRef<"LiquidationAttempt", 'String'>
    readonly positionId: FieldRef<"LiquidationAttempt", 'String'>
    readonly marketId: FieldRef<"LiquidationAttempt", 'String'>
    readonly timestamp: FieldRef<"LiquidationAttempt", 'String'>
    readonly currentPrice: FieldRef<"LiquidationAttempt", 'String'>
    readonly liquidationPrice: FieldRef<"LiquidationAttempt", 'String'>
    readonly status: FieldRef<"LiquidationAttempt", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LiquidationAttempt findUnique
   */
  export type LiquidationAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LiquidationAttempt to fetch.
     */
    where: LiquidationAttemptWhereUniqueInput
  }

  /**
   * LiquidationAttempt findUniqueOrThrow
   */
  export type LiquidationAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LiquidationAttempt to fetch.
     */
    where: LiquidationAttemptWhereUniqueInput
  }

  /**
   * LiquidationAttempt findFirst
   */
  export type LiquidationAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LiquidationAttempt to fetch.
     */
    where?: LiquidationAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiquidationAttempts to fetch.
     */
    orderBy?: LiquidationAttemptOrderByWithRelationInput | LiquidationAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiquidationAttempts.
     */
    cursor?: LiquidationAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiquidationAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiquidationAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiquidationAttempts.
     */
    distinct?: LiquidationAttemptScalarFieldEnum | LiquidationAttemptScalarFieldEnum[]
  }

  /**
   * LiquidationAttempt findFirstOrThrow
   */
  export type LiquidationAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LiquidationAttempt to fetch.
     */
    where?: LiquidationAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiquidationAttempts to fetch.
     */
    orderBy?: LiquidationAttemptOrderByWithRelationInput | LiquidationAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiquidationAttempts.
     */
    cursor?: LiquidationAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiquidationAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiquidationAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiquidationAttempts.
     */
    distinct?: LiquidationAttemptScalarFieldEnum | LiquidationAttemptScalarFieldEnum[]
  }

  /**
   * LiquidationAttempt findMany
   */
  export type LiquidationAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LiquidationAttempts to fetch.
     */
    where?: LiquidationAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiquidationAttempts to fetch.
     */
    orderBy?: LiquidationAttemptOrderByWithRelationInput | LiquidationAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LiquidationAttempts.
     */
    cursor?: LiquidationAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiquidationAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiquidationAttempts.
     */
    skip?: number
    distinct?: LiquidationAttemptScalarFieldEnum | LiquidationAttemptScalarFieldEnum[]
  }

  /**
   * LiquidationAttempt create
   */
  export type LiquidationAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * The data needed to create a LiquidationAttempt.
     */
    data: XOR<LiquidationAttemptCreateInput, LiquidationAttemptUncheckedCreateInput>
  }

  /**
   * LiquidationAttempt createMany
   */
  export type LiquidationAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LiquidationAttempts.
     */
    data: LiquidationAttemptCreateManyInput | LiquidationAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LiquidationAttempt createManyAndReturn
   */
  export type LiquidationAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many LiquidationAttempts.
     */
    data: LiquidationAttemptCreateManyInput | LiquidationAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LiquidationAttempt update
   */
  export type LiquidationAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * The data needed to update a LiquidationAttempt.
     */
    data: XOR<LiquidationAttemptUpdateInput, LiquidationAttemptUncheckedUpdateInput>
    /**
     * Choose, which LiquidationAttempt to update.
     */
    where: LiquidationAttemptWhereUniqueInput
  }

  /**
   * LiquidationAttempt updateMany
   */
  export type LiquidationAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LiquidationAttempts.
     */
    data: XOR<LiquidationAttemptUpdateManyMutationInput, LiquidationAttemptUncheckedUpdateManyInput>
    /**
     * Filter which LiquidationAttempts to update
     */
    where?: LiquidationAttemptWhereInput
    /**
     * Limit how many LiquidationAttempts to update.
     */
    limit?: number
  }

  /**
   * LiquidationAttempt updateManyAndReturn
   */
  export type LiquidationAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * The data used to update LiquidationAttempts.
     */
    data: XOR<LiquidationAttemptUpdateManyMutationInput, LiquidationAttemptUncheckedUpdateManyInput>
    /**
     * Filter which LiquidationAttempts to update
     */
    where?: LiquidationAttemptWhereInput
    /**
     * Limit how many LiquidationAttempts to update.
     */
    limit?: number
  }

  /**
   * LiquidationAttempt upsert
   */
  export type LiquidationAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * The filter to search for the LiquidationAttempt to update in case it exists.
     */
    where: LiquidationAttemptWhereUniqueInput
    /**
     * In case the LiquidationAttempt found by the `where` argument doesn't exist, create a new LiquidationAttempt with this data.
     */
    create: XOR<LiquidationAttemptCreateInput, LiquidationAttemptUncheckedCreateInput>
    /**
     * In case the LiquidationAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LiquidationAttemptUpdateInput, LiquidationAttemptUncheckedUpdateInput>
  }

  /**
   * LiquidationAttempt delete
   */
  export type LiquidationAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
    /**
     * Filter which LiquidationAttempt to delete.
     */
    where: LiquidationAttemptWhereUniqueInput
  }

  /**
   * LiquidationAttempt deleteMany
   */
  export type LiquidationAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiquidationAttempts to delete
     */
    where?: LiquidationAttemptWhereInput
    /**
     * Limit how many LiquidationAttempts to delete.
     */
    limit?: number
  }

  /**
   * LiquidationAttempt without action
   */
  export type LiquidationAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiquidationAttempt
     */
    select?: LiquidationAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiquidationAttempt
     */
    omit?: LiquidationAttemptOmit<ExtArgs> | null
  }


  /**
   * Model FundingSettlement
   */

  export type AggregateFundingSettlement = {
    _count: FundingSettlementCountAggregateOutputType | null
    _avg: FundingSettlementAvgAggregateOutputType | null
    _sum: FundingSettlementSumAggregateOutputType | null
    _min: FundingSettlementMinAggregateOutputType | null
    _max: FundingSettlementMaxAggregateOutputType | null
  }

  export type FundingSettlementAvgAggregateOutputType = {
    positionCount: number | null
  }

  export type FundingSettlementSumAggregateOutputType = {
    positionCount: number | null
  }

  export type FundingSettlementMinAggregateOutputType = {
    id: string | null
    marketId: string | null
    timestamp: string | null
    rate: string | null
    totalAmount: string | null
    longAmount: string | null
    shortAmount: string | null
    positionCount: number | null
  }

  export type FundingSettlementMaxAggregateOutputType = {
    id: string | null
    marketId: string | null
    timestamp: string | null
    rate: string | null
    totalAmount: string | null
    longAmount: string | null
    shortAmount: string | null
    positionCount: number | null
  }

  export type FundingSettlementCountAggregateOutputType = {
    id: number
    marketId: number
    timestamp: number
    rate: number
    totalAmount: number
    longAmount: number
    shortAmount: number
    positionCount: number
    _all: number
  }


  export type FundingSettlementAvgAggregateInputType = {
    positionCount?: true
  }

  export type FundingSettlementSumAggregateInputType = {
    positionCount?: true
  }

  export type FundingSettlementMinAggregateInputType = {
    id?: true
    marketId?: true
    timestamp?: true
    rate?: true
    totalAmount?: true
    longAmount?: true
    shortAmount?: true
    positionCount?: true
  }

  export type FundingSettlementMaxAggregateInputType = {
    id?: true
    marketId?: true
    timestamp?: true
    rate?: true
    totalAmount?: true
    longAmount?: true
    shortAmount?: true
    positionCount?: true
  }

  export type FundingSettlementCountAggregateInputType = {
    id?: true
    marketId?: true
    timestamp?: true
    rate?: true
    totalAmount?: true
    longAmount?: true
    shortAmount?: true
    positionCount?: true
    _all?: true
  }

  export type FundingSettlementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingSettlement to aggregate.
     */
    where?: FundingSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingSettlements to fetch.
     */
    orderBy?: FundingSettlementOrderByWithRelationInput | FundingSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FundingSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingSettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FundingSettlements
    **/
    _count?: true | FundingSettlementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FundingSettlementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FundingSettlementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FundingSettlementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FundingSettlementMaxAggregateInputType
  }

  export type GetFundingSettlementAggregateType<T extends FundingSettlementAggregateArgs> = {
        [P in keyof T & keyof AggregateFundingSettlement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFundingSettlement[P]>
      : GetScalarType<T[P], AggregateFundingSettlement[P]>
  }




  export type FundingSettlementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingSettlementWhereInput
    orderBy?: FundingSettlementOrderByWithAggregationInput | FundingSettlementOrderByWithAggregationInput[]
    by: FundingSettlementScalarFieldEnum[] | FundingSettlementScalarFieldEnum
    having?: FundingSettlementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FundingSettlementCountAggregateInputType | true
    _avg?: FundingSettlementAvgAggregateInputType
    _sum?: FundingSettlementSumAggregateInputType
    _min?: FundingSettlementMinAggregateInputType
    _max?: FundingSettlementMaxAggregateInputType
  }

  export type FundingSettlementGroupByOutputType = {
    id: string
    marketId: string
    timestamp: string
    rate: string
    totalAmount: string
    longAmount: string
    shortAmount: string
    positionCount: number
    _count: FundingSettlementCountAggregateOutputType | null
    _avg: FundingSettlementAvgAggregateOutputType | null
    _sum: FundingSettlementSumAggregateOutputType | null
    _min: FundingSettlementMinAggregateOutputType | null
    _max: FundingSettlementMaxAggregateOutputType | null
  }

  type GetFundingSettlementGroupByPayload<T extends FundingSettlementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FundingSettlementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FundingSettlementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FundingSettlementGroupByOutputType[P]>
            : GetScalarType<T[P], FundingSettlementGroupByOutputType[P]>
        }
      >
    >


  export type FundingSettlementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marketId?: boolean
    timestamp?: boolean
    rate?: boolean
    totalAmount?: boolean
    longAmount?: boolean
    shortAmount?: boolean
    positionCount?: boolean
  }, ExtArgs["result"]["fundingSettlement"]>

  export type FundingSettlementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marketId?: boolean
    timestamp?: boolean
    rate?: boolean
    totalAmount?: boolean
    longAmount?: boolean
    shortAmount?: boolean
    positionCount?: boolean
  }, ExtArgs["result"]["fundingSettlement"]>

  export type FundingSettlementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marketId?: boolean
    timestamp?: boolean
    rate?: boolean
    totalAmount?: boolean
    longAmount?: boolean
    shortAmount?: boolean
    positionCount?: boolean
  }, ExtArgs["result"]["fundingSettlement"]>

  export type FundingSettlementSelectScalar = {
    id?: boolean
    marketId?: boolean
    timestamp?: boolean
    rate?: boolean
    totalAmount?: boolean
    longAmount?: boolean
    shortAmount?: boolean
    positionCount?: boolean
  }

  export type FundingSettlementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "marketId" | "timestamp" | "rate" | "totalAmount" | "longAmount" | "shortAmount" | "positionCount", ExtArgs["result"]["fundingSettlement"]>

  export type $FundingSettlementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FundingSettlement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      marketId: string
      timestamp: string
      rate: string
      totalAmount: string
      longAmount: string
      shortAmount: string
      positionCount: number
    }, ExtArgs["result"]["fundingSettlement"]>
    composites: {}
  }

  type FundingSettlementGetPayload<S extends boolean | null | undefined | FundingSettlementDefaultArgs> = $Result.GetResult<Prisma.$FundingSettlementPayload, S>

  type FundingSettlementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FundingSettlementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FundingSettlementCountAggregateInputType | true
    }

  export interface FundingSettlementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FundingSettlement'], meta: { name: 'FundingSettlement' } }
    /**
     * Find zero or one FundingSettlement that matches the filter.
     * @param {FundingSettlementFindUniqueArgs} args - Arguments to find a FundingSettlement
     * @example
     * // Get one FundingSettlement
     * const fundingSettlement = await prisma.fundingSettlement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FundingSettlementFindUniqueArgs>(args: SelectSubset<T, FundingSettlementFindUniqueArgs<ExtArgs>>): Prisma__FundingSettlementClient<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FundingSettlement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FundingSettlementFindUniqueOrThrowArgs} args - Arguments to find a FundingSettlement
     * @example
     * // Get one FundingSettlement
     * const fundingSettlement = await prisma.fundingSettlement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FundingSettlementFindUniqueOrThrowArgs>(args: SelectSubset<T, FundingSettlementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FundingSettlementClient<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FundingSettlement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSettlementFindFirstArgs} args - Arguments to find a FundingSettlement
     * @example
     * // Get one FundingSettlement
     * const fundingSettlement = await prisma.fundingSettlement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FundingSettlementFindFirstArgs>(args?: SelectSubset<T, FundingSettlementFindFirstArgs<ExtArgs>>): Prisma__FundingSettlementClient<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FundingSettlement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSettlementFindFirstOrThrowArgs} args - Arguments to find a FundingSettlement
     * @example
     * // Get one FundingSettlement
     * const fundingSettlement = await prisma.fundingSettlement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FundingSettlementFindFirstOrThrowArgs>(args?: SelectSubset<T, FundingSettlementFindFirstOrThrowArgs<ExtArgs>>): Prisma__FundingSettlementClient<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FundingSettlements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSettlementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FundingSettlements
     * const fundingSettlements = await prisma.fundingSettlement.findMany()
     * 
     * // Get first 10 FundingSettlements
     * const fundingSettlements = await prisma.fundingSettlement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fundingSettlementWithIdOnly = await prisma.fundingSettlement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FundingSettlementFindManyArgs>(args?: SelectSubset<T, FundingSettlementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FundingSettlement.
     * @param {FundingSettlementCreateArgs} args - Arguments to create a FundingSettlement.
     * @example
     * // Create one FundingSettlement
     * const FundingSettlement = await prisma.fundingSettlement.create({
     *   data: {
     *     // ... data to create a FundingSettlement
     *   }
     * })
     * 
     */
    create<T extends FundingSettlementCreateArgs>(args: SelectSubset<T, FundingSettlementCreateArgs<ExtArgs>>): Prisma__FundingSettlementClient<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FundingSettlements.
     * @param {FundingSettlementCreateManyArgs} args - Arguments to create many FundingSettlements.
     * @example
     * // Create many FundingSettlements
     * const fundingSettlement = await prisma.fundingSettlement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FundingSettlementCreateManyArgs>(args?: SelectSubset<T, FundingSettlementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FundingSettlements and returns the data saved in the database.
     * @param {FundingSettlementCreateManyAndReturnArgs} args - Arguments to create many FundingSettlements.
     * @example
     * // Create many FundingSettlements
     * const fundingSettlement = await prisma.fundingSettlement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FundingSettlements and only return the `id`
     * const fundingSettlementWithIdOnly = await prisma.fundingSettlement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FundingSettlementCreateManyAndReturnArgs>(args?: SelectSubset<T, FundingSettlementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FundingSettlement.
     * @param {FundingSettlementDeleteArgs} args - Arguments to delete one FundingSettlement.
     * @example
     * // Delete one FundingSettlement
     * const FundingSettlement = await prisma.fundingSettlement.delete({
     *   where: {
     *     // ... filter to delete one FundingSettlement
     *   }
     * })
     * 
     */
    delete<T extends FundingSettlementDeleteArgs>(args: SelectSubset<T, FundingSettlementDeleteArgs<ExtArgs>>): Prisma__FundingSettlementClient<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FundingSettlement.
     * @param {FundingSettlementUpdateArgs} args - Arguments to update one FundingSettlement.
     * @example
     * // Update one FundingSettlement
     * const fundingSettlement = await prisma.fundingSettlement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FundingSettlementUpdateArgs>(args: SelectSubset<T, FundingSettlementUpdateArgs<ExtArgs>>): Prisma__FundingSettlementClient<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FundingSettlements.
     * @param {FundingSettlementDeleteManyArgs} args - Arguments to filter FundingSettlements to delete.
     * @example
     * // Delete a few FundingSettlements
     * const { count } = await prisma.fundingSettlement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FundingSettlementDeleteManyArgs>(args?: SelectSubset<T, FundingSettlementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingSettlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSettlementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FundingSettlements
     * const fundingSettlement = await prisma.fundingSettlement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FundingSettlementUpdateManyArgs>(args: SelectSubset<T, FundingSettlementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingSettlements and returns the data updated in the database.
     * @param {FundingSettlementUpdateManyAndReturnArgs} args - Arguments to update many FundingSettlements.
     * @example
     * // Update many FundingSettlements
     * const fundingSettlement = await prisma.fundingSettlement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FundingSettlements and only return the `id`
     * const fundingSettlementWithIdOnly = await prisma.fundingSettlement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FundingSettlementUpdateManyAndReturnArgs>(args: SelectSubset<T, FundingSettlementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FundingSettlement.
     * @param {FundingSettlementUpsertArgs} args - Arguments to update or create a FundingSettlement.
     * @example
     * // Update or create a FundingSettlement
     * const fundingSettlement = await prisma.fundingSettlement.upsert({
     *   create: {
     *     // ... data to create a FundingSettlement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FundingSettlement we want to update
     *   }
     * })
     */
    upsert<T extends FundingSettlementUpsertArgs>(args: SelectSubset<T, FundingSettlementUpsertArgs<ExtArgs>>): Prisma__FundingSettlementClient<$Result.GetResult<Prisma.$FundingSettlementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FundingSettlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSettlementCountArgs} args - Arguments to filter FundingSettlements to count.
     * @example
     * // Count the number of FundingSettlements
     * const count = await prisma.fundingSettlement.count({
     *   where: {
     *     // ... the filter for the FundingSettlements we want to count
     *   }
     * })
    **/
    count<T extends FundingSettlementCountArgs>(
      args?: Subset<T, FundingSettlementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FundingSettlementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FundingSettlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSettlementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FundingSettlementAggregateArgs>(args: Subset<T, FundingSettlementAggregateArgs>): Prisma.PrismaPromise<GetFundingSettlementAggregateType<T>>

    /**
     * Group by FundingSettlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingSettlementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FundingSettlementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FundingSettlementGroupByArgs['orderBy'] }
        : { orderBy?: FundingSettlementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FundingSettlementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFundingSettlementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FundingSettlement model
   */
  readonly fields: FundingSettlementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FundingSettlement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FundingSettlementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FundingSettlement model
   */
  interface FundingSettlementFieldRefs {
    readonly id: FieldRef<"FundingSettlement", 'String'>
    readonly marketId: FieldRef<"FundingSettlement", 'String'>
    readonly timestamp: FieldRef<"FundingSettlement", 'String'>
    readonly rate: FieldRef<"FundingSettlement", 'String'>
    readonly totalAmount: FieldRef<"FundingSettlement", 'String'>
    readonly longAmount: FieldRef<"FundingSettlement", 'String'>
    readonly shortAmount: FieldRef<"FundingSettlement", 'String'>
    readonly positionCount: FieldRef<"FundingSettlement", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * FundingSettlement findUnique
   */
  export type FundingSettlementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * Filter, which FundingSettlement to fetch.
     */
    where: FundingSettlementWhereUniqueInput
  }

  /**
   * FundingSettlement findUniqueOrThrow
   */
  export type FundingSettlementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * Filter, which FundingSettlement to fetch.
     */
    where: FundingSettlementWhereUniqueInput
  }

  /**
   * FundingSettlement findFirst
   */
  export type FundingSettlementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * Filter, which FundingSettlement to fetch.
     */
    where?: FundingSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingSettlements to fetch.
     */
    orderBy?: FundingSettlementOrderByWithRelationInput | FundingSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingSettlements.
     */
    cursor?: FundingSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingSettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingSettlements.
     */
    distinct?: FundingSettlementScalarFieldEnum | FundingSettlementScalarFieldEnum[]
  }

  /**
   * FundingSettlement findFirstOrThrow
   */
  export type FundingSettlementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * Filter, which FundingSettlement to fetch.
     */
    where?: FundingSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingSettlements to fetch.
     */
    orderBy?: FundingSettlementOrderByWithRelationInput | FundingSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingSettlements.
     */
    cursor?: FundingSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingSettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingSettlements.
     */
    distinct?: FundingSettlementScalarFieldEnum | FundingSettlementScalarFieldEnum[]
  }

  /**
   * FundingSettlement findMany
   */
  export type FundingSettlementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * Filter, which FundingSettlements to fetch.
     */
    where?: FundingSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingSettlements to fetch.
     */
    orderBy?: FundingSettlementOrderByWithRelationInput | FundingSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FundingSettlements.
     */
    cursor?: FundingSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingSettlements.
     */
    skip?: number
    distinct?: FundingSettlementScalarFieldEnum | FundingSettlementScalarFieldEnum[]
  }

  /**
   * FundingSettlement create
   */
  export type FundingSettlementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * The data needed to create a FundingSettlement.
     */
    data: XOR<FundingSettlementCreateInput, FundingSettlementUncheckedCreateInput>
  }

  /**
   * FundingSettlement createMany
   */
  export type FundingSettlementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FundingSettlements.
     */
    data: FundingSettlementCreateManyInput | FundingSettlementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FundingSettlement createManyAndReturn
   */
  export type FundingSettlementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * The data used to create many FundingSettlements.
     */
    data: FundingSettlementCreateManyInput | FundingSettlementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FundingSettlement update
   */
  export type FundingSettlementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * The data needed to update a FundingSettlement.
     */
    data: XOR<FundingSettlementUpdateInput, FundingSettlementUncheckedUpdateInput>
    /**
     * Choose, which FundingSettlement to update.
     */
    where: FundingSettlementWhereUniqueInput
  }

  /**
   * FundingSettlement updateMany
   */
  export type FundingSettlementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FundingSettlements.
     */
    data: XOR<FundingSettlementUpdateManyMutationInput, FundingSettlementUncheckedUpdateManyInput>
    /**
     * Filter which FundingSettlements to update
     */
    where?: FundingSettlementWhereInput
    /**
     * Limit how many FundingSettlements to update.
     */
    limit?: number
  }

  /**
   * FundingSettlement updateManyAndReturn
   */
  export type FundingSettlementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * The data used to update FundingSettlements.
     */
    data: XOR<FundingSettlementUpdateManyMutationInput, FundingSettlementUncheckedUpdateManyInput>
    /**
     * Filter which FundingSettlements to update
     */
    where?: FundingSettlementWhereInput
    /**
     * Limit how many FundingSettlements to update.
     */
    limit?: number
  }

  /**
   * FundingSettlement upsert
   */
  export type FundingSettlementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * The filter to search for the FundingSettlement to update in case it exists.
     */
    where: FundingSettlementWhereUniqueInput
    /**
     * In case the FundingSettlement found by the `where` argument doesn't exist, create a new FundingSettlement with this data.
     */
    create: XOR<FundingSettlementCreateInput, FundingSettlementUncheckedCreateInput>
    /**
     * In case the FundingSettlement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FundingSettlementUpdateInput, FundingSettlementUncheckedUpdateInput>
  }

  /**
   * FundingSettlement delete
   */
  export type FundingSettlementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
    /**
     * Filter which FundingSettlement to delete.
     */
    where: FundingSettlementWhereUniqueInput
  }

  /**
   * FundingSettlement deleteMany
   */
  export type FundingSettlementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingSettlements to delete
     */
    where?: FundingSettlementWhereInput
    /**
     * Limit how many FundingSettlements to delete.
     */
    limit?: number
  }

  /**
   * FundingSettlement without action
   */
  export type FundingSettlementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingSettlement
     */
    select?: FundingSettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FundingSettlement
     */
    omit?: FundingSettlementOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    publicKey: 'publicKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MarketScalarFieldEnum: {
    id: 'id',
    assetSymbol: 'assetSymbol',
    marketAddress: 'marketAddress',
    baseAssetReserve: 'baseAssetReserve',
    quoteAssetReserve: 'quoteAssetReserve',
    fundingRate: 'fundingRate',
    lastFundingTs: 'lastFundingTs',
    totalLongSize: 'totalLongSize',
    totalShortSize: 'totalShortSize',
    maxLeverage: 'maxLeverage',
    minMarginRatioBps: 'minMarginRatioBps',
    feeBps: 'feeBps',
    isActive: 'isActive',
    minPositionSize: 'minPositionSize',
    maxPriceImpactBps: 'maxPriceImpactBps',
    kFactor: 'kFactor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MarketScalarFieldEnum = (typeof MarketScalarFieldEnum)[keyof typeof MarketScalarFieldEnum]


  export const PositionScalarFieldEnum: {
    id: 'id',
    positionAddress: 'positionAddress',
    userId: 'userId',
    marketId: 'marketId',
    isLong: 'isLong',
    size: 'size',
    entryPrice: 'entryPrice',
    collateral: 'collateral',
    leverage: 'leverage',
    openedAt: 'openedAt',
    lastFundingTs: 'lastFundingTs',
    realizedPnlFromFunding: 'realizedPnlFromFunding',
    liquidationPrice: 'liquidationPrice',
    isClosed: 'isClosed',
    closedAt: 'closedAt',
    closingPrice: 'closingPrice',
    realizedPnl: 'realizedPnl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PositionScalarFieldEnum = (typeof PositionScalarFieldEnum)[keyof typeof PositionScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    marketId: 'marketId',
    orderType: 'orderType',
    isLong: 'isLong',
    size: 'size',
    price: 'price',
    collateral: 'collateral',
    leverage: 'leverage',
    isActive: 'isActive',
    maxSlippageBps: 'maxSlippageBps',
    createdAt: 'createdAt',
    positionId: 'positionId',
    executionPrice: 'executionPrice',
    executedAt: 'executedAt',
    cancelledAt: 'cancelledAt',
    txHash: 'txHash',
    lastError: 'lastError'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const TradeScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    positionId: 'positionId',
    userId: 'userId',
    marketId: 'marketId',
    side: 'side',
    size: 'size',
    price: 'price',
    fee: 'fee',
    txHash: 'txHash',
    createdAt: 'createdAt'
  };

  export type TradeScalarFieldEnum = (typeof TradeScalarFieldEnum)[keyof typeof TradeScalarFieldEnum]


  export const FundingPaymentScalarFieldEnum: {
    id: 'id',
    marketId: 'marketId',
    positionId: 'positionId',
    amount: 'amount',
    rate: 'rate',
    timestamp: 'timestamp',
    txHash: 'txHash',
    createdAt: 'createdAt'
  };

  export type FundingPaymentScalarFieldEnum = (typeof FundingPaymentScalarFieldEnum)[keyof typeof FundingPaymentScalarFieldEnum]


  export const LiquidationScalarFieldEnum: {
    id: 'id',
    positionId: 'positionId',
    liquidator: 'liquidator',
    liquidationPrice: 'liquidationPrice',
    collateralReturned: 'collateralReturned',
    fee: 'fee',
    txHash: 'txHash',
    timestamp: 'timestamp',
    createdAt: 'createdAt',
    marketId: 'marketId'
  };

  export type LiquidationScalarFieldEnum = (typeof LiquidationScalarFieldEnum)[keyof typeof LiquidationScalarFieldEnum]


  export const PriceHistoryScalarFieldEnum: {
    id: 'id',
    marketId: 'marketId',
    markPrice: 'markPrice',
    indexPrice: 'indexPrice',
    timestamp: 'timestamp',
    createdAt: 'createdAt'
  };

  export type PriceHistoryScalarFieldEnum = (typeof PriceHistoryScalarFieldEnum)[keyof typeof PriceHistoryScalarFieldEnum]


  export const SystemHealthScalarFieldEnum: {
    id: 'id',
    component: 'component',
    status: 'status',
    metrics: 'metrics',
    timestamp: 'timestamp'
  };

  export type SystemHealthScalarFieldEnum = (typeof SystemHealthScalarFieldEnum)[keyof typeof SystemHealthScalarFieldEnum]


  export const LiquidationAttemptScalarFieldEnum: {
    id: 'id',
    positionId: 'positionId',
    marketId: 'marketId',
    timestamp: 'timestamp',
    currentPrice: 'currentPrice',
    liquidationPrice: 'liquidationPrice',
    status: 'status'
  };

  export type LiquidationAttemptScalarFieldEnum = (typeof LiquidationAttemptScalarFieldEnum)[keyof typeof LiquidationAttemptScalarFieldEnum]


  export const FundingSettlementScalarFieldEnum: {
    id: 'id',
    marketId: 'marketId',
    timestamp: 'timestamp',
    rate: 'rate',
    totalAmount: 'totalAmount',
    longAmount: 'longAmount',
    shortAmount: 'shortAmount',
    positionCount: 'positionCount'
  };

  export type FundingSettlementScalarFieldEnum = (typeof FundingSettlementScalarFieldEnum)[keyof typeof FundingSettlementScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'OrderSide'
   */
  export type EnumOrderSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderSide'>
    


  /**
   * Reference to a field of type 'OrderSide[]'
   */
  export type ListEnumOrderSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderSide[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    publicKey?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    positions?: PositionListRelationFilter
    orders?: OrderListRelationFilter
    trades?: TradeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    publicKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    positions?: PositionOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    trades?: TradeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    publicKey?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    positions?: PositionListRelationFilter
    orders?: OrderListRelationFilter
    trades?: TradeListRelationFilter
  }, "id" | "publicKey">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    publicKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    publicKey?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MarketWhereInput = {
    AND?: MarketWhereInput | MarketWhereInput[]
    OR?: MarketWhereInput[]
    NOT?: MarketWhereInput | MarketWhereInput[]
    id?: StringFilter<"Market"> | string
    assetSymbol?: StringFilter<"Market"> | string
    marketAddress?: StringFilter<"Market"> | string
    baseAssetReserve?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFilter<"Market"> | bigint | number
    totalLongSize?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFilter<"Market"> | number
    minMarginRatioBps?: IntFilter<"Market"> | number
    feeBps?: IntFilter<"Market"> | number
    isActive?: BoolFilter<"Market"> | boolean
    minPositionSize?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFilter<"Market"> | number
    kFactor?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Market"> | Date | string
    updatedAt?: DateTimeFilter<"Market"> | Date | string
    positions?: PositionListRelationFilter
    orders?: OrderListRelationFilter
    trades?: TradeListRelationFilter
    fundingPayments?: FundingPaymentListRelationFilter
    liquidations?: LiquidationListRelationFilter
    priceHistory?: PriceHistoryListRelationFilter
  }

  export type MarketOrderByWithRelationInput = {
    id?: SortOrder
    assetSymbol?: SortOrder
    marketAddress?: SortOrder
    baseAssetReserve?: SortOrder
    quoteAssetReserve?: SortOrder
    fundingRate?: SortOrder
    lastFundingTs?: SortOrder
    totalLongSize?: SortOrder
    totalShortSize?: SortOrder
    maxLeverage?: SortOrder
    minMarginRatioBps?: SortOrder
    feeBps?: SortOrder
    isActive?: SortOrder
    minPositionSize?: SortOrder
    maxPriceImpactBps?: SortOrder
    kFactor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    positions?: PositionOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    trades?: TradeOrderByRelationAggregateInput
    fundingPayments?: FundingPaymentOrderByRelationAggregateInput
    liquidations?: LiquidationOrderByRelationAggregateInput
    priceHistory?: PriceHistoryOrderByRelationAggregateInput
  }

  export type MarketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    marketAddress?: string
    AND?: MarketWhereInput | MarketWhereInput[]
    OR?: MarketWhereInput[]
    NOT?: MarketWhereInput | MarketWhereInput[]
    assetSymbol?: StringFilter<"Market"> | string
    baseAssetReserve?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFilter<"Market"> | bigint | number
    totalLongSize?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFilter<"Market"> | number
    minMarginRatioBps?: IntFilter<"Market"> | number
    feeBps?: IntFilter<"Market"> | number
    isActive?: BoolFilter<"Market"> | boolean
    minPositionSize?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFilter<"Market"> | number
    kFactor?: DecimalFilter<"Market"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Market"> | Date | string
    updatedAt?: DateTimeFilter<"Market"> | Date | string
    positions?: PositionListRelationFilter
    orders?: OrderListRelationFilter
    trades?: TradeListRelationFilter
    fundingPayments?: FundingPaymentListRelationFilter
    liquidations?: LiquidationListRelationFilter
    priceHistory?: PriceHistoryListRelationFilter
  }, "id" | "marketAddress">

  export type MarketOrderByWithAggregationInput = {
    id?: SortOrder
    assetSymbol?: SortOrder
    marketAddress?: SortOrder
    baseAssetReserve?: SortOrder
    quoteAssetReserve?: SortOrder
    fundingRate?: SortOrder
    lastFundingTs?: SortOrder
    totalLongSize?: SortOrder
    totalShortSize?: SortOrder
    maxLeverage?: SortOrder
    minMarginRatioBps?: SortOrder
    feeBps?: SortOrder
    isActive?: SortOrder
    minPositionSize?: SortOrder
    maxPriceImpactBps?: SortOrder
    kFactor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MarketCountOrderByAggregateInput
    _avg?: MarketAvgOrderByAggregateInput
    _max?: MarketMaxOrderByAggregateInput
    _min?: MarketMinOrderByAggregateInput
    _sum?: MarketSumOrderByAggregateInput
  }

  export type MarketScalarWhereWithAggregatesInput = {
    AND?: MarketScalarWhereWithAggregatesInput | MarketScalarWhereWithAggregatesInput[]
    OR?: MarketScalarWhereWithAggregatesInput[]
    NOT?: MarketScalarWhereWithAggregatesInput | MarketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Market"> | string
    assetSymbol?: StringWithAggregatesFilter<"Market"> | string
    marketAddress?: StringWithAggregatesFilter<"Market"> | string
    baseAssetReserve?: DecimalWithAggregatesFilter<"Market"> | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalWithAggregatesFilter<"Market"> | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalWithAggregatesFilter<"Market"> | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntWithAggregatesFilter<"Market"> | bigint | number
    totalLongSize?: DecimalWithAggregatesFilter<"Market"> | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalWithAggregatesFilter<"Market"> | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntWithAggregatesFilter<"Market"> | number
    minMarginRatioBps?: IntWithAggregatesFilter<"Market"> | number
    feeBps?: IntWithAggregatesFilter<"Market"> | number
    isActive?: BoolWithAggregatesFilter<"Market"> | boolean
    minPositionSize?: DecimalWithAggregatesFilter<"Market"> | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntWithAggregatesFilter<"Market"> | number
    kFactor?: DecimalWithAggregatesFilter<"Market"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Market"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Market"> | Date | string
  }

  export type PositionWhereInput = {
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    id?: StringFilter<"Position"> | string
    positionAddress?: StringFilter<"Position"> | string
    userId?: StringFilter<"Position"> | string
    marketId?: StringFilter<"Position"> | string
    isLong?: BoolFilter<"Position"> | boolean
    size?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    leverage?: IntFilter<"Position"> | number
    openedAt?: BigIntFilter<"Position"> | bigint | number
    lastFundingTs?: BigIntFilter<"Position"> | bigint | number
    realizedPnlFromFunding?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFilter<"Position"> | boolean
    closedAt?: BigIntNullableFilter<"Position"> | bigint | number | null
    closingPrice?: DecimalNullableFilter<"Position"> | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: DecimalNullableFilter<"Position"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Position"> | Date | string
    updatedAt?: DateTimeFilter<"Position"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    fundingPayments?: FundingPaymentListRelationFilter
    liquidation?: XOR<LiquidationNullableScalarRelationFilter, LiquidationWhereInput> | null
    trades?: TradeListRelationFilter
  }

  export type PositionOrderByWithRelationInput = {
    id?: SortOrder
    positionAddress?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    openedAt?: SortOrder
    lastFundingTs?: SortOrder
    realizedPnlFromFunding?: SortOrder
    liquidationPrice?: SortOrder
    isClosed?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    closingPrice?: SortOrderInput | SortOrder
    realizedPnl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    market?: MarketOrderByWithRelationInput
    fundingPayments?: FundingPaymentOrderByRelationAggregateInput
    liquidation?: LiquidationOrderByWithRelationInput
    trades?: TradeOrderByRelationAggregateInput
  }

  export type PositionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    positionAddress?: string
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    userId?: StringFilter<"Position"> | string
    marketId?: StringFilter<"Position"> | string
    isLong?: BoolFilter<"Position"> | boolean
    size?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    leverage?: IntFilter<"Position"> | number
    openedAt?: BigIntFilter<"Position"> | bigint | number
    lastFundingTs?: BigIntFilter<"Position"> | bigint | number
    realizedPnlFromFunding?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFilter<"Position"> | boolean
    closedAt?: BigIntNullableFilter<"Position"> | bigint | number | null
    closingPrice?: DecimalNullableFilter<"Position"> | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: DecimalNullableFilter<"Position"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Position"> | Date | string
    updatedAt?: DateTimeFilter<"Position"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    fundingPayments?: FundingPaymentListRelationFilter
    liquidation?: XOR<LiquidationNullableScalarRelationFilter, LiquidationWhereInput> | null
    trades?: TradeListRelationFilter
  }, "id" | "positionAddress">

  export type PositionOrderByWithAggregationInput = {
    id?: SortOrder
    positionAddress?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    openedAt?: SortOrder
    lastFundingTs?: SortOrder
    realizedPnlFromFunding?: SortOrder
    liquidationPrice?: SortOrder
    isClosed?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    closingPrice?: SortOrderInput | SortOrder
    realizedPnl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PositionCountOrderByAggregateInput
    _avg?: PositionAvgOrderByAggregateInput
    _max?: PositionMaxOrderByAggregateInput
    _min?: PositionMinOrderByAggregateInput
    _sum?: PositionSumOrderByAggregateInput
  }

  export type PositionScalarWhereWithAggregatesInput = {
    AND?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    OR?: PositionScalarWhereWithAggregatesInput[]
    NOT?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Position"> | string
    positionAddress?: StringWithAggregatesFilter<"Position"> | string
    userId?: StringWithAggregatesFilter<"Position"> | string
    marketId?: StringWithAggregatesFilter<"Position"> | string
    isLong?: BoolWithAggregatesFilter<"Position"> | boolean
    size?: DecimalWithAggregatesFilter<"Position"> | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalWithAggregatesFilter<"Position"> | Decimal | DecimalJsLike | number | string
    collateral?: DecimalWithAggregatesFilter<"Position"> | Decimal | DecimalJsLike | number | string
    leverage?: IntWithAggregatesFilter<"Position"> | number
    openedAt?: BigIntWithAggregatesFilter<"Position"> | bigint | number
    lastFundingTs?: BigIntWithAggregatesFilter<"Position"> | bigint | number
    realizedPnlFromFunding?: DecimalWithAggregatesFilter<"Position"> | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalWithAggregatesFilter<"Position"> | Decimal | DecimalJsLike | number | string
    isClosed?: BoolWithAggregatesFilter<"Position"> | boolean
    closedAt?: BigIntNullableWithAggregatesFilter<"Position"> | bigint | number | null
    closingPrice?: DecimalNullableWithAggregatesFilter<"Position"> | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: DecimalNullableWithAggregatesFilter<"Position"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Position"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Position"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    marketId?: StringFilter<"Order"> | string
    orderType?: IntFilter<"Order"> | number
    isLong?: BoolFilter<"Order"> | boolean
    size?: StringFilter<"Order"> | string
    price?: StringFilter<"Order"> | string
    collateral?: StringFilter<"Order"> | string
    leverage?: IntFilter<"Order"> | number
    isActive?: BoolFilter<"Order"> | boolean
    maxSlippageBps?: IntFilter<"Order"> | number
    createdAt?: StringFilter<"Order"> | string
    positionId?: StringNullableFilter<"Order"> | string | null
    executionPrice?: StringNullableFilter<"Order"> | string | null
    executedAt?: StringNullableFilter<"Order"> | string | null
    cancelledAt?: StringNullableFilter<"Order"> | string | null
    txHash?: StringNullableFilter<"Order"> | string | null
    lastError?: StringNullableFilter<"Order"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    trades?: TradeListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    orderType?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    price?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    isActive?: SortOrder
    maxSlippageBps?: SortOrder
    createdAt?: SortOrder
    positionId?: SortOrderInput | SortOrder
    executionPrice?: SortOrderInput | SortOrder
    executedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    market?: MarketOrderByWithRelationInput
    trades?: TradeOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    userId?: StringFilter<"Order"> | string
    marketId?: StringFilter<"Order"> | string
    orderType?: IntFilter<"Order"> | number
    isLong?: BoolFilter<"Order"> | boolean
    size?: StringFilter<"Order"> | string
    price?: StringFilter<"Order"> | string
    collateral?: StringFilter<"Order"> | string
    leverage?: IntFilter<"Order"> | number
    isActive?: BoolFilter<"Order"> | boolean
    maxSlippageBps?: IntFilter<"Order"> | number
    createdAt?: StringFilter<"Order"> | string
    positionId?: StringNullableFilter<"Order"> | string | null
    executionPrice?: StringNullableFilter<"Order"> | string | null
    executedAt?: StringNullableFilter<"Order"> | string | null
    cancelledAt?: StringNullableFilter<"Order"> | string | null
    txHash?: StringNullableFilter<"Order"> | string | null
    lastError?: StringNullableFilter<"Order"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    trades?: TradeListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    orderType?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    price?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    isActive?: SortOrder
    maxSlippageBps?: SortOrder
    createdAt?: SortOrder
    positionId?: SortOrderInput | SortOrder
    executionPrice?: SortOrderInput | SortOrder
    executedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    userId?: StringWithAggregatesFilter<"Order"> | string
    marketId?: StringWithAggregatesFilter<"Order"> | string
    orderType?: IntWithAggregatesFilter<"Order"> | number
    isLong?: BoolWithAggregatesFilter<"Order"> | boolean
    size?: StringWithAggregatesFilter<"Order"> | string
    price?: StringWithAggregatesFilter<"Order"> | string
    collateral?: StringWithAggregatesFilter<"Order"> | string
    leverage?: IntWithAggregatesFilter<"Order"> | number
    isActive?: BoolWithAggregatesFilter<"Order"> | boolean
    maxSlippageBps?: IntWithAggregatesFilter<"Order"> | number
    createdAt?: StringWithAggregatesFilter<"Order"> | string
    positionId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    executionPrice?: StringNullableWithAggregatesFilter<"Order"> | string | null
    executedAt?: StringNullableWithAggregatesFilter<"Order"> | string | null
    cancelledAt?: StringNullableWithAggregatesFilter<"Order"> | string | null
    txHash?: StringNullableWithAggregatesFilter<"Order"> | string | null
    lastError?: StringNullableWithAggregatesFilter<"Order"> | string | null
  }

  export type TradeWhereInput = {
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    id?: StringFilter<"Trade"> | string
    orderId?: StringFilter<"Trade"> | string
    positionId?: StringFilter<"Trade"> | string
    userId?: StringFilter<"Trade"> | string
    marketId?: StringFilter<"Trade"> | string
    side?: EnumOrderSideFilter<"Trade"> | $Enums.OrderSide
    size?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    price?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    txHash?: StringFilter<"Trade"> | string
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TradeOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    positionId?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    side?: SortOrder
    size?: SortOrder
    price?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    position?: PositionOrderByWithRelationInput
    market?: MarketOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    orderId?: StringFilter<"Trade"> | string
    positionId?: StringFilter<"Trade"> | string
    userId?: StringFilter<"Trade"> | string
    marketId?: StringFilter<"Trade"> | string
    side?: EnumOrderSideFilter<"Trade"> | $Enums.OrderSide
    size?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    price?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    txHash?: StringFilter<"Trade"> | string
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TradeOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    positionId?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    side?: SortOrder
    size?: SortOrder
    price?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    _count?: TradeCountOrderByAggregateInput
    _avg?: TradeAvgOrderByAggregateInput
    _max?: TradeMaxOrderByAggregateInput
    _min?: TradeMinOrderByAggregateInput
    _sum?: TradeSumOrderByAggregateInput
  }

  export type TradeScalarWhereWithAggregatesInput = {
    AND?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    OR?: TradeScalarWhereWithAggregatesInput[]
    NOT?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trade"> | string
    orderId?: StringWithAggregatesFilter<"Trade"> | string
    positionId?: StringWithAggregatesFilter<"Trade"> | string
    userId?: StringWithAggregatesFilter<"Trade"> | string
    marketId?: StringWithAggregatesFilter<"Trade"> | string
    side?: EnumOrderSideWithAggregatesFilter<"Trade"> | $Enums.OrderSide
    size?: DecimalWithAggregatesFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    price?: DecimalWithAggregatesFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalWithAggregatesFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    txHash?: StringWithAggregatesFilter<"Trade"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
  }

  export type FundingPaymentWhereInput = {
    AND?: FundingPaymentWhereInput | FundingPaymentWhereInput[]
    OR?: FundingPaymentWhereInput[]
    NOT?: FundingPaymentWhereInput | FundingPaymentWhereInput[]
    id?: StringFilter<"FundingPayment"> | string
    marketId?: StringFilter<"FundingPayment"> | string
    positionId?: StringFilter<"FundingPayment"> | string
    amount?: DecimalFilter<"FundingPayment"> | Decimal | DecimalJsLike | number | string
    rate?: DecimalFilter<"FundingPayment"> | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFilter<"FundingPayment"> | bigint | number
    txHash?: StringNullableFilter<"FundingPayment"> | string | null
    createdAt?: DateTimeFilter<"FundingPayment"> | Date | string
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
  }

  export type FundingPaymentOrderByWithRelationInput = {
    id?: SortOrder
    marketId?: SortOrder
    positionId?: SortOrder
    amount?: SortOrder
    rate?: SortOrder
    timestamp?: SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    market?: MarketOrderByWithRelationInput
    position?: PositionOrderByWithRelationInput
  }

  export type FundingPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FundingPaymentWhereInput | FundingPaymentWhereInput[]
    OR?: FundingPaymentWhereInput[]
    NOT?: FundingPaymentWhereInput | FundingPaymentWhereInput[]
    marketId?: StringFilter<"FundingPayment"> | string
    positionId?: StringFilter<"FundingPayment"> | string
    amount?: DecimalFilter<"FundingPayment"> | Decimal | DecimalJsLike | number | string
    rate?: DecimalFilter<"FundingPayment"> | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFilter<"FundingPayment"> | bigint | number
    txHash?: StringNullableFilter<"FundingPayment"> | string | null
    createdAt?: DateTimeFilter<"FundingPayment"> | Date | string
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
  }, "id">

  export type FundingPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    marketId?: SortOrder
    positionId?: SortOrder
    amount?: SortOrder
    rate?: SortOrder
    timestamp?: SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FundingPaymentCountOrderByAggregateInput
    _avg?: FundingPaymentAvgOrderByAggregateInput
    _max?: FundingPaymentMaxOrderByAggregateInput
    _min?: FundingPaymentMinOrderByAggregateInput
    _sum?: FundingPaymentSumOrderByAggregateInput
  }

  export type FundingPaymentScalarWhereWithAggregatesInput = {
    AND?: FundingPaymentScalarWhereWithAggregatesInput | FundingPaymentScalarWhereWithAggregatesInput[]
    OR?: FundingPaymentScalarWhereWithAggregatesInput[]
    NOT?: FundingPaymentScalarWhereWithAggregatesInput | FundingPaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FundingPayment"> | string
    marketId?: StringWithAggregatesFilter<"FundingPayment"> | string
    positionId?: StringWithAggregatesFilter<"FundingPayment"> | string
    amount?: DecimalWithAggregatesFilter<"FundingPayment"> | Decimal | DecimalJsLike | number | string
    rate?: DecimalWithAggregatesFilter<"FundingPayment"> | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntWithAggregatesFilter<"FundingPayment"> | bigint | number
    txHash?: StringNullableWithAggregatesFilter<"FundingPayment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FundingPayment"> | Date | string
  }

  export type LiquidationWhereInput = {
    AND?: LiquidationWhereInput | LiquidationWhereInput[]
    OR?: LiquidationWhereInput[]
    NOT?: LiquidationWhereInput | LiquidationWhereInput[]
    id?: StringFilter<"Liquidation"> | string
    positionId?: StringFilter<"Liquidation"> | string
    liquidator?: StringNullableFilter<"Liquidation"> | string | null
    liquidationPrice?: DecimalFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    txHash?: StringFilter<"Liquidation"> | string
    timestamp?: BigIntFilter<"Liquidation"> | bigint | number
    createdAt?: DateTimeFilter<"Liquidation"> | Date | string
    marketId?: StringFilter<"Liquidation"> | string
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
  }

  export type LiquidationOrderByWithRelationInput = {
    id?: SortOrder
    positionId?: SortOrder
    liquidator?: SortOrderInput | SortOrder
    liquidationPrice?: SortOrder
    collateralReturned?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    marketId?: SortOrder
    position?: PositionOrderByWithRelationInput
    market?: MarketOrderByWithRelationInput
  }

  export type LiquidationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    positionId?: string
    AND?: LiquidationWhereInput | LiquidationWhereInput[]
    OR?: LiquidationWhereInput[]
    NOT?: LiquidationWhereInput | LiquidationWhereInput[]
    liquidator?: StringNullableFilter<"Liquidation"> | string | null
    liquidationPrice?: DecimalFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    txHash?: StringFilter<"Liquidation"> | string
    timestamp?: BigIntFilter<"Liquidation"> | bigint | number
    createdAt?: DateTimeFilter<"Liquidation"> | Date | string
    marketId?: StringFilter<"Liquidation"> | string
    position?: XOR<PositionScalarRelationFilter, PositionWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
  }, "id" | "positionId">

  export type LiquidationOrderByWithAggregationInput = {
    id?: SortOrder
    positionId?: SortOrder
    liquidator?: SortOrderInput | SortOrder
    liquidationPrice?: SortOrder
    collateralReturned?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    marketId?: SortOrder
    _count?: LiquidationCountOrderByAggregateInput
    _avg?: LiquidationAvgOrderByAggregateInput
    _max?: LiquidationMaxOrderByAggregateInput
    _min?: LiquidationMinOrderByAggregateInput
    _sum?: LiquidationSumOrderByAggregateInput
  }

  export type LiquidationScalarWhereWithAggregatesInput = {
    AND?: LiquidationScalarWhereWithAggregatesInput | LiquidationScalarWhereWithAggregatesInput[]
    OR?: LiquidationScalarWhereWithAggregatesInput[]
    NOT?: LiquidationScalarWhereWithAggregatesInput | LiquidationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Liquidation"> | string
    positionId?: StringWithAggregatesFilter<"Liquidation"> | string
    liquidator?: StringNullableWithAggregatesFilter<"Liquidation"> | string | null
    liquidationPrice?: DecimalWithAggregatesFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalWithAggregatesFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalWithAggregatesFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    txHash?: StringWithAggregatesFilter<"Liquidation"> | string
    timestamp?: BigIntWithAggregatesFilter<"Liquidation"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"Liquidation"> | Date | string
    marketId?: StringWithAggregatesFilter<"Liquidation"> | string
  }

  export type PriceHistoryWhereInput = {
    AND?: PriceHistoryWhereInput | PriceHistoryWhereInput[]
    OR?: PriceHistoryWhereInput[]
    NOT?: PriceHistoryWhereInput | PriceHistoryWhereInput[]
    id?: StringFilter<"PriceHistory"> | string
    marketId?: StringFilter<"PriceHistory"> | string
    markPrice?: DecimalFilter<"PriceHistory"> | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFilter<"PriceHistory"> | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFilter<"PriceHistory"> | bigint | number
    createdAt?: DateTimeFilter<"PriceHistory"> | Date | string
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
  }

  export type PriceHistoryOrderByWithRelationInput = {
    id?: SortOrder
    marketId?: SortOrder
    markPrice?: SortOrder
    indexPrice?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    market?: MarketOrderByWithRelationInput
  }

  export type PriceHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PriceHistoryWhereInput | PriceHistoryWhereInput[]
    OR?: PriceHistoryWhereInput[]
    NOT?: PriceHistoryWhereInput | PriceHistoryWhereInput[]
    marketId?: StringFilter<"PriceHistory"> | string
    markPrice?: DecimalFilter<"PriceHistory"> | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFilter<"PriceHistory"> | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFilter<"PriceHistory"> | bigint | number
    createdAt?: DateTimeFilter<"PriceHistory"> | Date | string
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
  }, "id">

  export type PriceHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    marketId?: SortOrder
    markPrice?: SortOrder
    indexPrice?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    _count?: PriceHistoryCountOrderByAggregateInput
    _avg?: PriceHistoryAvgOrderByAggregateInput
    _max?: PriceHistoryMaxOrderByAggregateInput
    _min?: PriceHistoryMinOrderByAggregateInput
    _sum?: PriceHistorySumOrderByAggregateInput
  }

  export type PriceHistoryScalarWhereWithAggregatesInput = {
    AND?: PriceHistoryScalarWhereWithAggregatesInput | PriceHistoryScalarWhereWithAggregatesInput[]
    OR?: PriceHistoryScalarWhereWithAggregatesInput[]
    NOT?: PriceHistoryScalarWhereWithAggregatesInput | PriceHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PriceHistory"> | string
    marketId?: StringWithAggregatesFilter<"PriceHistory"> | string
    markPrice?: DecimalWithAggregatesFilter<"PriceHistory"> | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalWithAggregatesFilter<"PriceHistory"> | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntWithAggregatesFilter<"PriceHistory"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"PriceHistory"> | Date | string
  }

  export type SystemHealthWhereInput = {
    AND?: SystemHealthWhereInput | SystemHealthWhereInput[]
    OR?: SystemHealthWhereInput[]
    NOT?: SystemHealthWhereInput | SystemHealthWhereInput[]
    id?: StringFilter<"SystemHealth"> | string
    component?: StringFilter<"SystemHealth"> | string
    status?: StringFilter<"SystemHealth"> | string
    metrics?: StringFilter<"SystemHealth"> | string
    timestamp?: StringFilter<"SystemHealth"> | string
  }

  export type SystemHealthOrderByWithRelationInput = {
    id?: SortOrder
    component?: SortOrder
    status?: SortOrder
    metrics?: SortOrder
    timestamp?: SortOrder
  }

  export type SystemHealthWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SystemHealthWhereInput | SystemHealthWhereInput[]
    OR?: SystemHealthWhereInput[]
    NOT?: SystemHealthWhereInput | SystemHealthWhereInput[]
    component?: StringFilter<"SystemHealth"> | string
    status?: StringFilter<"SystemHealth"> | string
    metrics?: StringFilter<"SystemHealth"> | string
    timestamp?: StringFilter<"SystemHealth"> | string
  }, "id">

  export type SystemHealthOrderByWithAggregationInput = {
    id?: SortOrder
    component?: SortOrder
    status?: SortOrder
    metrics?: SortOrder
    timestamp?: SortOrder
    _count?: SystemHealthCountOrderByAggregateInput
    _max?: SystemHealthMaxOrderByAggregateInput
    _min?: SystemHealthMinOrderByAggregateInput
  }

  export type SystemHealthScalarWhereWithAggregatesInput = {
    AND?: SystemHealthScalarWhereWithAggregatesInput | SystemHealthScalarWhereWithAggregatesInput[]
    OR?: SystemHealthScalarWhereWithAggregatesInput[]
    NOT?: SystemHealthScalarWhereWithAggregatesInput | SystemHealthScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemHealth"> | string
    component?: StringWithAggregatesFilter<"SystemHealth"> | string
    status?: StringWithAggregatesFilter<"SystemHealth"> | string
    metrics?: StringWithAggregatesFilter<"SystemHealth"> | string
    timestamp?: StringWithAggregatesFilter<"SystemHealth"> | string
  }

  export type LiquidationAttemptWhereInput = {
    AND?: LiquidationAttemptWhereInput | LiquidationAttemptWhereInput[]
    OR?: LiquidationAttemptWhereInput[]
    NOT?: LiquidationAttemptWhereInput | LiquidationAttemptWhereInput[]
    id?: StringFilter<"LiquidationAttempt"> | string
    positionId?: StringFilter<"LiquidationAttempt"> | string
    marketId?: StringFilter<"LiquidationAttempt"> | string
    timestamp?: StringFilter<"LiquidationAttempt"> | string
    currentPrice?: StringFilter<"LiquidationAttempt"> | string
    liquidationPrice?: StringFilter<"LiquidationAttempt"> | string
    status?: StringFilter<"LiquidationAttempt"> | string
  }

  export type LiquidationAttemptOrderByWithRelationInput = {
    id?: SortOrder
    positionId?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    currentPrice?: SortOrder
    liquidationPrice?: SortOrder
    status?: SortOrder
  }

  export type LiquidationAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LiquidationAttemptWhereInput | LiquidationAttemptWhereInput[]
    OR?: LiquidationAttemptWhereInput[]
    NOT?: LiquidationAttemptWhereInput | LiquidationAttemptWhereInput[]
    positionId?: StringFilter<"LiquidationAttempt"> | string
    marketId?: StringFilter<"LiquidationAttempt"> | string
    timestamp?: StringFilter<"LiquidationAttempt"> | string
    currentPrice?: StringFilter<"LiquidationAttempt"> | string
    liquidationPrice?: StringFilter<"LiquidationAttempt"> | string
    status?: StringFilter<"LiquidationAttempt"> | string
  }, "id">

  export type LiquidationAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    positionId?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    currentPrice?: SortOrder
    liquidationPrice?: SortOrder
    status?: SortOrder
    _count?: LiquidationAttemptCountOrderByAggregateInput
    _max?: LiquidationAttemptMaxOrderByAggregateInput
    _min?: LiquidationAttemptMinOrderByAggregateInput
  }

  export type LiquidationAttemptScalarWhereWithAggregatesInput = {
    AND?: LiquidationAttemptScalarWhereWithAggregatesInput | LiquidationAttemptScalarWhereWithAggregatesInput[]
    OR?: LiquidationAttemptScalarWhereWithAggregatesInput[]
    NOT?: LiquidationAttemptScalarWhereWithAggregatesInput | LiquidationAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LiquidationAttempt"> | string
    positionId?: StringWithAggregatesFilter<"LiquidationAttempt"> | string
    marketId?: StringWithAggregatesFilter<"LiquidationAttempt"> | string
    timestamp?: StringWithAggregatesFilter<"LiquidationAttempt"> | string
    currentPrice?: StringWithAggregatesFilter<"LiquidationAttempt"> | string
    liquidationPrice?: StringWithAggregatesFilter<"LiquidationAttempt"> | string
    status?: StringWithAggregatesFilter<"LiquidationAttempt"> | string
  }

  export type FundingSettlementWhereInput = {
    AND?: FundingSettlementWhereInput | FundingSettlementWhereInput[]
    OR?: FundingSettlementWhereInput[]
    NOT?: FundingSettlementWhereInput | FundingSettlementWhereInput[]
    id?: StringFilter<"FundingSettlement"> | string
    marketId?: StringFilter<"FundingSettlement"> | string
    timestamp?: StringFilter<"FundingSettlement"> | string
    rate?: StringFilter<"FundingSettlement"> | string
    totalAmount?: StringFilter<"FundingSettlement"> | string
    longAmount?: StringFilter<"FundingSettlement"> | string
    shortAmount?: StringFilter<"FundingSettlement"> | string
    positionCount?: IntFilter<"FundingSettlement"> | number
  }

  export type FundingSettlementOrderByWithRelationInput = {
    id?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    rate?: SortOrder
    totalAmount?: SortOrder
    longAmount?: SortOrder
    shortAmount?: SortOrder
    positionCount?: SortOrder
  }

  export type FundingSettlementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FundingSettlementWhereInput | FundingSettlementWhereInput[]
    OR?: FundingSettlementWhereInput[]
    NOT?: FundingSettlementWhereInput | FundingSettlementWhereInput[]
    marketId?: StringFilter<"FundingSettlement"> | string
    timestamp?: StringFilter<"FundingSettlement"> | string
    rate?: StringFilter<"FundingSettlement"> | string
    totalAmount?: StringFilter<"FundingSettlement"> | string
    longAmount?: StringFilter<"FundingSettlement"> | string
    shortAmount?: StringFilter<"FundingSettlement"> | string
    positionCount?: IntFilter<"FundingSettlement"> | number
  }, "id">

  export type FundingSettlementOrderByWithAggregationInput = {
    id?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    rate?: SortOrder
    totalAmount?: SortOrder
    longAmount?: SortOrder
    shortAmount?: SortOrder
    positionCount?: SortOrder
    _count?: FundingSettlementCountOrderByAggregateInput
    _avg?: FundingSettlementAvgOrderByAggregateInput
    _max?: FundingSettlementMaxOrderByAggregateInput
    _min?: FundingSettlementMinOrderByAggregateInput
    _sum?: FundingSettlementSumOrderByAggregateInput
  }

  export type FundingSettlementScalarWhereWithAggregatesInput = {
    AND?: FundingSettlementScalarWhereWithAggregatesInput | FundingSettlementScalarWhereWithAggregatesInput[]
    OR?: FundingSettlementScalarWhereWithAggregatesInput[]
    NOT?: FundingSettlementScalarWhereWithAggregatesInput | FundingSettlementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FundingSettlement"> | string
    marketId?: StringWithAggregatesFilter<"FundingSettlement"> | string
    timestamp?: StringWithAggregatesFilter<"FundingSettlement"> | string
    rate?: StringWithAggregatesFilter<"FundingSettlement"> | string
    totalAmount?: StringWithAggregatesFilter<"FundingSettlement"> | string
    longAmount?: StringWithAggregatesFilter<"FundingSettlement"> | string
    shortAmount?: StringWithAggregatesFilter<"FundingSettlement"> | string
    positionCount?: IntWithAggregatesFilter<"FundingSettlement"> | number
  }

  export type UserCreateInput = {
    id: string
    publicKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    trades?: TradeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    publicKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    trades?: TradeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    publicKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketCreateInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionCreateNestedManyWithoutMarketInput
    orders?: OrderCreateNestedManyWithoutMarketInput
    trades?: TradeCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutMarketInput
    orders?: OrderUncheckedCreateNestedManyWithoutMarketInput
    trades?: TradeUncheckedCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationUncheckedCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutMarketNestedInput
    orders?: OrderUpdateManyWithoutMarketNestedInput
    trades?: TradeUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutMarketNestedInput
    orders?: OrderUncheckedUpdateManyWithoutMarketNestedInput
    trades?: TradeUncheckedUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUncheckedUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type MarketCreateManyInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionCreateInput = {
    id: string
    positionAddress: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPositionsInput
    market: MarketCreateNestedOneWithoutPositionsInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutPositionInput
    liquidation?: LiquidationCreateNestedOneWithoutPositionInput
    trades?: TradeCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateInput = {
    id: string
    positionAddress: string
    userId: string
    marketId: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutPositionInput
    liquidation?: LiquidationUncheckedCreateNestedOneWithoutPositionInput
    trades?: TradeUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPositionsNestedInput
    market?: MarketUpdateOneRequiredWithoutPositionsNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutPositionNestedInput
    liquidation?: LiquidationUpdateOneWithoutPositionNestedInput
    trades?: TradeUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutPositionNestedInput
    liquidation?: LiquidationUncheckedUpdateOneWithoutPositionNestedInput
    trades?: TradeUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type PositionCreateManyInput = {
    id: string
    positionAddress: string
    userId: string
    marketId: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PositionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
    user: UserCreateNestedOneWithoutOrdersInput
    market: MarketCreateNestedOneWithoutOrdersInput
    trades?: TradeCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id: string
    userId: string
    marketId: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
    trades?: TradeUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    market?: MarketUpdateOneRequiredWithoutOrdersNestedInput
    trades?: TradeUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    trades?: TradeUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id: string
    userId: string
    marketId: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TradeCreateInput = {
    id: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutTradesInput
    position: PositionCreateNestedOneWithoutTradesInput
    market: MarketCreateNestedOneWithoutTradesInput
    user: UserCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateInput = {
    id: string
    orderId: string
    positionId: string
    userId: string
    marketId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type TradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutTradesNestedInput
    position?: PositionUpdateOneRequiredWithoutTradesNestedInput
    market?: MarketUpdateOneRequiredWithoutTradesNestedInput
    user?: UserUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyInput = {
    id: string
    orderId: string
    positionId: string
    userId: string
    marketId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type TradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingPaymentCreateInput = {
    id: string
    amount: Decimal | DecimalJsLike | number | string
    rate: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    txHash?: string | null
    createdAt?: Date | string
    market: MarketCreateNestedOneWithoutFundingPaymentsInput
    position: PositionCreateNestedOneWithoutFundingPaymentsInput
  }

  export type FundingPaymentUncheckedCreateInput = {
    id: string
    marketId: string
    positionId: string
    amount: Decimal | DecimalJsLike | number | string
    rate: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    txHash?: string | null
    createdAt?: Date | string
  }

  export type FundingPaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutFundingPaymentsNestedInput
    position?: PositionUpdateOneRequiredWithoutFundingPaymentsNestedInput
  }

  export type FundingPaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingPaymentCreateManyInput = {
    id: string
    marketId: string
    positionId: string
    amount: Decimal | DecimalJsLike | number | string
    rate: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    txHash?: string | null
    createdAt?: Date | string
  }

  export type FundingPaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingPaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidationCreateInput = {
    id: string
    liquidator?: string | null
    liquidationPrice: Decimal | DecimalJsLike | number | string
    collateralReturned: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    timestamp: bigint | number
    createdAt?: Date | string
    position: PositionCreateNestedOneWithoutLiquidationInput
    market: MarketCreateNestedOneWithoutLiquidationsInput
  }

  export type LiquidationUncheckedCreateInput = {
    id: string
    positionId: string
    liquidator?: string | null
    liquidationPrice: Decimal | DecimalJsLike | number | string
    collateralReturned: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    timestamp: bigint | number
    createdAt?: Date | string
    marketId: string
  }

  export type LiquidationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    liquidator?: NullableStringFieldUpdateOperationsInput | string | null
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    position?: PositionUpdateOneRequiredWithoutLiquidationNestedInput
    market?: MarketUpdateOneRequiredWithoutLiquidationsNestedInput
  }

  export type LiquidationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    liquidator?: NullableStringFieldUpdateOperationsInput | string | null
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketId?: StringFieldUpdateOperationsInput | string
  }

  export type LiquidationCreateManyInput = {
    id: string
    positionId: string
    liquidator?: string | null
    liquidationPrice: Decimal | DecimalJsLike | number | string
    collateralReturned: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    timestamp: bigint | number
    createdAt?: Date | string
    marketId: string
  }

  export type LiquidationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    liquidator?: NullableStringFieldUpdateOperationsInput | string | null
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    liquidator?: NullableStringFieldUpdateOperationsInput | string | null
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketId?: StringFieldUpdateOperationsInput | string
  }

  export type PriceHistoryCreateInput = {
    id?: string
    markPrice: Decimal | DecimalJsLike | number | string
    indexPrice: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    createdAt?: Date | string
    market: MarketCreateNestedOneWithoutPriceHistoryInput
  }

  export type PriceHistoryUncheckedCreateInput = {
    id?: string
    marketId: string
    markPrice: Decimal | DecimalJsLike | number | string
    indexPrice: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type PriceHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    markPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutPriceHistoryNestedInput
  }

  export type PriceHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    markPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryCreateManyInput = {
    id?: string
    marketId: string
    markPrice: Decimal | DecimalJsLike | number | string
    indexPrice: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type PriceHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    markPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    markPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemHealthCreateInput = {
    id: string
    component: string
    status: string
    metrics: string
    timestamp: string
  }

  export type SystemHealthUncheckedCreateInput = {
    id: string
    component: string
    status: string
    metrics: string
    timestamp: string
  }

  export type SystemHealthUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    component?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metrics?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
  }

  export type SystemHealthUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    component?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metrics?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
  }

  export type SystemHealthCreateManyInput = {
    id: string
    component: string
    status: string
    metrics: string
    timestamp: string
  }

  export type SystemHealthUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    component?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metrics?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
  }

  export type SystemHealthUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    component?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metrics?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
  }

  export type LiquidationAttemptCreateInput = {
    id: string
    positionId: string
    marketId: string
    timestamp: string
    currentPrice: string
    liquidationPrice: string
    status: string
  }

  export type LiquidationAttemptUncheckedCreateInput = {
    id: string
    positionId: string
    marketId: string
    timestamp: string
    currentPrice: string
    liquidationPrice: string
    status: string
  }

  export type LiquidationAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    currentPrice?: StringFieldUpdateOperationsInput | string
    liquidationPrice?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type LiquidationAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    currentPrice?: StringFieldUpdateOperationsInput | string
    liquidationPrice?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type LiquidationAttemptCreateManyInput = {
    id: string
    positionId: string
    marketId: string
    timestamp: string
    currentPrice: string
    liquidationPrice: string
    status: string
  }

  export type LiquidationAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    currentPrice?: StringFieldUpdateOperationsInput | string
    liquidationPrice?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type LiquidationAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    currentPrice?: StringFieldUpdateOperationsInput | string
    liquidationPrice?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type FundingSettlementCreateInput = {
    id: string
    marketId: string
    timestamp: string
    rate: string
    totalAmount: string
    longAmount: string
    shortAmount: string
    positionCount: number
  }

  export type FundingSettlementUncheckedCreateInput = {
    id: string
    marketId: string
    timestamp: string
    rate: string
    totalAmount: string
    longAmount: string
    shortAmount: string
    positionCount: number
  }

  export type FundingSettlementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    rate?: StringFieldUpdateOperationsInput | string
    totalAmount?: StringFieldUpdateOperationsInput | string
    longAmount?: StringFieldUpdateOperationsInput | string
    shortAmount?: StringFieldUpdateOperationsInput | string
    positionCount?: IntFieldUpdateOperationsInput | number
  }

  export type FundingSettlementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    rate?: StringFieldUpdateOperationsInput | string
    totalAmount?: StringFieldUpdateOperationsInput | string
    longAmount?: StringFieldUpdateOperationsInput | string
    shortAmount?: StringFieldUpdateOperationsInput | string
    positionCount?: IntFieldUpdateOperationsInput | number
  }

  export type FundingSettlementCreateManyInput = {
    id: string
    marketId: string
    timestamp: string
    rate: string
    totalAmount: string
    longAmount: string
    shortAmount: string
    positionCount: number
  }

  export type FundingSettlementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    rate?: StringFieldUpdateOperationsInput | string
    totalAmount?: StringFieldUpdateOperationsInput | string
    longAmount?: StringFieldUpdateOperationsInput | string
    shortAmount?: StringFieldUpdateOperationsInput | string
    positionCount?: IntFieldUpdateOperationsInput | number
  }

  export type FundingSettlementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    rate?: StringFieldUpdateOperationsInput | string
    totalAmount?: StringFieldUpdateOperationsInput | string
    longAmount?: StringFieldUpdateOperationsInput | string
    shortAmount?: StringFieldUpdateOperationsInput | string
    positionCount?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PositionListRelationFilter = {
    every?: PositionWhereInput
    some?: PositionWhereInput
    none?: PositionWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type TradeListRelationFilter = {
    every?: TradeWhereInput
    some?: TradeWhereInput
    none?: TradeWhereInput
  }

  export type PositionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    publicKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    publicKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    publicKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FundingPaymentListRelationFilter = {
    every?: FundingPaymentWhereInput
    some?: FundingPaymentWhereInput
    none?: FundingPaymentWhereInput
  }

  export type LiquidationListRelationFilter = {
    every?: LiquidationWhereInput
    some?: LiquidationWhereInput
    none?: LiquidationWhereInput
  }

  export type PriceHistoryListRelationFilter = {
    every?: PriceHistoryWhereInput
    some?: PriceHistoryWhereInput
    none?: PriceHistoryWhereInput
  }

  export type FundingPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LiquidationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PriceHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MarketCountOrderByAggregateInput = {
    id?: SortOrder
    assetSymbol?: SortOrder
    marketAddress?: SortOrder
    baseAssetReserve?: SortOrder
    quoteAssetReserve?: SortOrder
    fundingRate?: SortOrder
    lastFundingTs?: SortOrder
    totalLongSize?: SortOrder
    totalShortSize?: SortOrder
    maxLeverage?: SortOrder
    minMarginRatioBps?: SortOrder
    feeBps?: SortOrder
    isActive?: SortOrder
    minPositionSize?: SortOrder
    maxPriceImpactBps?: SortOrder
    kFactor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketAvgOrderByAggregateInput = {
    baseAssetReserve?: SortOrder
    quoteAssetReserve?: SortOrder
    fundingRate?: SortOrder
    lastFundingTs?: SortOrder
    totalLongSize?: SortOrder
    totalShortSize?: SortOrder
    maxLeverage?: SortOrder
    minMarginRatioBps?: SortOrder
    feeBps?: SortOrder
    minPositionSize?: SortOrder
    maxPriceImpactBps?: SortOrder
    kFactor?: SortOrder
  }

  export type MarketMaxOrderByAggregateInput = {
    id?: SortOrder
    assetSymbol?: SortOrder
    marketAddress?: SortOrder
    baseAssetReserve?: SortOrder
    quoteAssetReserve?: SortOrder
    fundingRate?: SortOrder
    lastFundingTs?: SortOrder
    totalLongSize?: SortOrder
    totalShortSize?: SortOrder
    maxLeverage?: SortOrder
    minMarginRatioBps?: SortOrder
    feeBps?: SortOrder
    isActive?: SortOrder
    minPositionSize?: SortOrder
    maxPriceImpactBps?: SortOrder
    kFactor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketMinOrderByAggregateInput = {
    id?: SortOrder
    assetSymbol?: SortOrder
    marketAddress?: SortOrder
    baseAssetReserve?: SortOrder
    quoteAssetReserve?: SortOrder
    fundingRate?: SortOrder
    lastFundingTs?: SortOrder
    totalLongSize?: SortOrder
    totalShortSize?: SortOrder
    maxLeverage?: SortOrder
    minMarginRatioBps?: SortOrder
    feeBps?: SortOrder
    isActive?: SortOrder
    minPositionSize?: SortOrder
    maxPriceImpactBps?: SortOrder
    kFactor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketSumOrderByAggregateInput = {
    baseAssetReserve?: SortOrder
    quoteAssetReserve?: SortOrder
    fundingRate?: SortOrder
    lastFundingTs?: SortOrder
    totalLongSize?: SortOrder
    totalShortSize?: SortOrder
    maxLeverage?: SortOrder
    minMarginRatioBps?: SortOrder
    feeBps?: SortOrder
    minPositionSize?: SortOrder
    maxPriceImpactBps?: SortOrder
    kFactor?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MarketScalarRelationFilter = {
    is?: MarketWhereInput
    isNot?: MarketWhereInput
  }

  export type LiquidationNullableScalarRelationFilter = {
    is?: LiquidationWhereInput | null
    isNot?: LiquidationWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PositionCountOrderByAggregateInput = {
    id?: SortOrder
    positionAddress?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    openedAt?: SortOrder
    lastFundingTs?: SortOrder
    realizedPnlFromFunding?: SortOrder
    liquidationPrice?: SortOrder
    isClosed?: SortOrder
    closedAt?: SortOrder
    closingPrice?: SortOrder
    realizedPnl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PositionAvgOrderByAggregateInput = {
    size?: SortOrder
    entryPrice?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    openedAt?: SortOrder
    lastFundingTs?: SortOrder
    realizedPnlFromFunding?: SortOrder
    liquidationPrice?: SortOrder
    closedAt?: SortOrder
    closingPrice?: SortOrder
    realizedPnl?: SortOrder
  }

  export type PositionMaxOrderByAggregateInput = {
    id?: SortOrder
    positionAddress?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    openedAt?: SortOrder
    lastFundingTs?: SortOrder
    realizedPnlFromFunding?: SortOrder
    liquidationPrice?: SortOrder
    isClosed?: SortOrder
    closedAt?: SortOrder
    closingPrice?: SortOrder
    realizedPnl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PositionMinOrderByAggregateInput = {
    id?: SortOrder
    positionAddress?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    openedAt?: SortOrder
    lastFundingTs?: SortOrder
    realizedPnlFromFunding?: SortOrder
    liquidationPrice?: SortOrder
    isClosed?: SortOrder
    closedAt?: SortOrder
    closingPrice?: SortOrder
    realizedPnl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PositionSumOrderByAggregateInput = {
    size?: SortOrder
    entryPrice?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    openedAt?: SortOrder
    lastFundingTs?: SortOrder
    realizedPnlFromFunding?: SortOrder
    liquidationPrice?: SortOrder
    closedAt?: SortOrder
    closingPrice?: SortOrder
    realizedPnl?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    orderType?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    price?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    isActive?: SortOrder
    maxSlippageBps?: SortOrder
    createdAt?: SortOrder
    positionId?: SortOrder
    executionPrice?: SortOrder
    executedAt?: SortOrder
    cancelledAt?: SortOrder
    txHash?: SortOrder
    lastError?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    orderType?: SortOrder
    leverage?: SortOrder
    maxSlippageBps?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    orderType?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    price?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    isActive?: SortOrder
    maxSlippageBps?: SortOrder
    createdAt?: SortOrder
    positionId?: SortOrder
    executionPrice?: SortOrder
    executedAt?: SortOrder
    cancelledAt?: SortOrder
    txHash?: SortOrder
    lastError?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    orderType?: SortOrder
    isLong?: SortOrder
    size?: SortOrder
    price?: SortOrder
    collateral?: SortOrder
    leverage?: SortOrder
    isActive?: SortOrder
    maxSlippageBps?: SortOrder
    createdAt?: SortOrder
    positionId?: SortOrder
    executionPrice?: SortOrder
    executedAt?: SortOrder
    cancelledAt?: SortOrder
    txHash?: SortOrder
    lastError?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    orderType?: SortOrder
    leverage?: SortOrder
    maxSlippageBps?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumOrderSideFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideFilter<$PrismaModel> | $Enums.OrderSide
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type PositionScalarRelationFilter = {
    is?: PositionWhereInput
    isNot?: PositionWhereInput
  }

  export type TradeCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    positionId?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    side?: SortOrder
    size?: SortOrder
    price?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeAvgOrderByAggregateInput = {
    size?: SortOrder
    price?: SortOrder
    fee?: SortOrder
  }

  export type TradeMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    positionId?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    side?: SortOrder
    size?: SortOrder
    price?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    positionId?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    side?: SortOrder
    size?: SortOrder
    price?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeSumOrderByAggregateInput = {
    size?: SortOrder
    price?: SortOrder
    fee?: SortOrder
  }

  export type EnumOrderSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideWithAggregatesFilter<$PrismaModel> | $Enums.OrderSide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderSideFilter<$PrismaModel>
    _max?: NestedEnumOrderSideFilter<$PrismaModel>
  }

  export type FundingPaymentCountOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
    positionId?: SortOrder
    amount?: SortOrder
    rate?: SortOrder
    timestamp?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type FundingPaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    rate?: SortOrder
    timestamp?: SortOrder
  }

  export type FundingPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
    positionId?: SortOrder
    amount?: SortOrder
    rate?: SortOrder
    timestamp?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type FundingPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
    positionId?: SortOrder
    amount?: SortOrder
    rate?: SortOrder
    timestamp?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type FundingPaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    rate?: SortOrder
    timestamp?: SortOrder
  }

  export type LiquidationCountOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    liquidator?: SortOrder
    liquidationPrice?: SortOrder
    collateralReturned?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    marketId?: SortOrder
  }

  export type LiquidationAvgOrderByAggregateInput = {
    liquidationPrice?: SortOrder
    collateralReturned?: SortOrder
    fee?: SortOrder
    timestamp?: SortOrder
  }

  export type LiquidationMaxOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    liquidator?: SortOrder
    liquidationPrice?: SortOrder
    collateralReturned?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    marketId?: SortOrder
  }

  export type LiquidationMinOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    liquidator?: SortOrder
    liquidationPrice?: SortOrder
    collateralReturned?: SortOrder
    fee?: SortOrder
    txHash?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    marketId?: SortOrder
  }

  export type LiquidationSumOrderByAggregateInput = {
    liquidationPrice?: SortOrder
    collateralReturned?: SortOrder
    fee?: SortOrder
    timestamp?: SortOrder
  }

  export type PriceHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
    markPrice?: SortOrder
    indexPrice?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type PriceHistoryAvgOrderByAggregateInput = {
    markPrice?: SortOrder
    indexPrice?: SortOrder
    timestamp?: SortOrder
  }

  export type PriceHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
    markPrice?: SortOrder
    indexPrice?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type PriceHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
    markPrice?: SortOrder
    indexPrice?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type PriceHistorySumOrderByAggregateInput = {
    markPrice?: SortOrder
    indexPrice?: SortOrder
    timestamp?: SortOrder
  }

  export type SystemHealthCountOrderByAggregateInput = {
    id?: SortOrder
    component?: SortOrder
    status?: SortOrder
    metrics?: SortOrder
    timestamp?: SortOrder
  }

  export type SystemHealthMaxOrderByAggregateInput = {
    id?: SortOrder
    component?: SortOrder
    status?: SortOrder
    metrics?: SortOrder
    timestamp?: SortOrder
  }

  export type SystemHealthMinOrderByAggregateInput = {
    id?: SortOrder
    component?: SortOrder
    status?: SortOrder
    metrics?: SortOrder
    timestamp?: SortOrder
  }

  export type LiquidationAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    currentPrice?: SortOrder
    liquidationPrice?: SortOrder
    status?: SortOrder
  }

  export type LiquidationAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    currentPrice?: SortOrder
    liquidationPrice?: SortOrder
    status?: SortOrder
  }

  export type LiquidationAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    positionId?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    currentPrice?: SortOrder
    liquidationPrice?: SortOrder
    status?: SortOrder
  }

  export type FundingSettlementCountOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    rate?: SortOrder
    totalAmount?: SortOrder
    longAmount?: SortOrder
    shortAmount?: SortOrder
    positionCount?: SortOrder
  }

  export type FundingSettlementAvgOrderByAggregateInput = {
    positionCount?: SortOrder
  }

  export type FundingSettlementMaxOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    rate?: SortOrder
    totalAmount?: SortOrder
    longAmount?: SortOrder
    shortAmount?: SortOrder
    positionCount?: SortOrder
  }

  export type FundingSettlementMinOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
    timestamp?: SortOrder
    rate?: SortOrder
    totalAmount?: SortOrder
    longAmount?: SortOrder
    shortAmount?: SortOrder
    positionCount?: SortOrder
  }

  export type FundingSettlementSumOrderByAggregateInput = {
    positionCount?: SortOrder
  }

  export type PositionCreateNestedManyWithoutUserInput = {
    create?: XOR<PositionCreateWithoutUserInput, PositionUncheckedCreateWithoutUserInput> | PositionCreateWithoutUserInput[] | PositionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutUserInput | PositionCreateOrConnectWithoutUserInput[]
    createMany?: PositionCreateManyUserInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type TradeCreateNestedManyWithoutUserInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type PositionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PositionCreateWithoutUserInput, PositionUncheckedCreateWithoutUserInput> | PositionCreateWithoutUserInput[] | PositionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutUserInput | PositionCreateOrConnectWithoutUserInput[]
    createMany?: PositionCreateManyUserInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PositionUpdateManyWithoutUserNestedInput = {
    create?: XOR<PositionCreateWithoutUserInput, PositionUncheckedCreateWithoutUserInput> | PositionCreateWithoutUserInput[] | PositionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutUserInput | PositionCreateOrConnectWithoutUserInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutUserInput | PositionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PositionCreateManyUserInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutUserInput | PositionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutUserInput | PositionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type TradeUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutUserInput | TradeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutUserInput | TradeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutUserInput | TradeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type PositionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PositionCreateWithoutUserInput, PositionUncheckedCreateWithoutUserInput> | PositionCreateWithoutUserInput[] | PositionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutUserInput | PositionCreateOrConnectWithoutUserInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutUserInput | PositionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PositionCreateManyUserInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutUserInput | PositionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutUserInput | PositionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput> | TradeCreateWithoutUserInput[] | TradeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutUserInput | TradeCreateOrConnectWithoutUserInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutUserInput | TradeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradeCreateManyUserInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutUserInput | TradeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutUserInput | TradeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type PositionCreateNestedManyWithoutMarketInput = {
    create?: XOR<PositionCreateWithoutMarketInput, PositionUncheckedCreateWithoutMarketInput> | PositionCreateWithoutMarketInput[] | PositionUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutMarketInput | PositionCreateOrConnectWithoutMarketInput[]
    createMany?: PositionCreateManyMarketInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutMarketInput = {
    create?: XOR<OrderCreateWithoutMarketInput, OrderUncheckedCreateWithoutMarketInput> | OrderCreateWithoutMarketInput[] | OrderUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutMarketInput | OrderCreateOrConnectWithoutMarketInput[]
    createMany?: OrderCreateManyMarketInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type TradeCreateNestedManyWithoutMarketInput = {
    create?: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput> | TradeCreateWithoutMarketInput[] | TradeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutMarketInput | TradeCreateOrConnectWithoutMarketInput[]
    createMany?: TradeCreateManyMarketInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type FundingPaymentCreateNestedManyWithoutMarketInput = {
    create?: XOR<FundingPaymentCreateWithoutMarketInput, FundingPaymentUncheckedCreateWithoutMarketInput> | FundingPaymentCreateWithoutMarketInput[] | FundingPaymentUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: FundingPaymentCreateOrConnectWithoutMarketInput | FundingPaymentCreateOrConnectWithoutMarketInput[]
    createMany?: FundingPaymentCreateManyMarketInputEnvelope
    connect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
  }

  export type LiquidationCreateNestedManyWithoutMarketInput = {
    create?: XOR<LiquidationCreateWithoutMarketInput, LiquidationUncheckedCreateWithoutMarketInput> | LiquidationCreateWithoutMarketInput[] | LiquidationUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: LiquidationCreateOrConnectWithoutMarketInput | LiquidationCreateOrConnectWithoutMarketInput[]
    createMany?: LiquidationCreateManyMarketInputEnvelope
    connect?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
  }

  export type PriceHistoryCreateNestedManyWithoutMarketInput = {
    create?: XOR<PriceHistoryCreateWithoutMarketInput, PriceHistoryUncheckedCreateWithoutMarketInput> | PriceHistoryCreateWithoutMarketInput[] | PriceHistoryUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PriceHistoryCreateOrConnectWithoutMarketInput | PriceHistoryCreateOrConnectWithoutMarketInput[]
    createMany?: PriceHistoryCreateManyMarketInputEnvelope
    connect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
  }

  export type PositionUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<PositionCreateWithoutMarketInput, PositionUncheckedCreateWithoutMarketInput> | PositionCreateWithoutMarketInput[] | PositionUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutMarketInput | PositionCreateOrConnectWithoutMarketInput[]
    createMany?: PositionCreateManyMarketInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<OrderCreateWithoutMarketInput, OrderUncheckedCreateWithoutMarketInput> | OrderCreateWithoutMarketInput[] | OrderUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutMarketInput | OrderCreateOrConnectWithoutMarketInput[]
    createMany?: OrderCreateManyMarketInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput> | TradeCreateWithoutMarketInput[] | TradeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutMarketInput | TradeCreateOrConnectWithoutMarketInput[]
    createMany?: TradeCreateManyMarketInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type FundingPaymentUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<FundingPaymentCreateWithoutMarketInput, FundingPaymentUncheckedCreateWithoutMarketInput> | FundingPaymentCreateWithoutMarketInput[] | FundingPaymentUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: FundingPaymentCreateOrConnectWithoutMarketInput | FundingPaymentCreateOrConnectWithoutMarketInput[]
    createMany?: FundingPaymentCreateManyMarketInputEnvelope
    connect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
  }

  export type LiquidationUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<LiquidationCreateWithoutMarketInput, LiquidationUncheckedCreateWithoutMarketInput> | LiquidationCreateWithoutMarketInput[] | LiquidationUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: LiquidationCreateOrConnectWithoutMarketInput | LiquidationCreateOrConnectWithoutMarketInput[]
    createMany?: LiquidationCreateManyMarketInputEnvelope
    connect?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
  }

  export type PriceHistoryUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<PriceHistoryCreateWithoutMarketInput, PriceHistoryUncheckedCreateWithoutMarketInput> | PriceHistoryCreateWithoutMarketInput[] | PriceHistoryUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PriceHistoryCreateOrConnectWithoutMarketInput | PriceHistoryCreateOrConnectWithoutMarketInput[]
    createMany?: PriceHistoryCreateManyMarketInputEnvelope
    connect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PositionUpdateManyWithoutMarketNestedInput = {
    create?: XOR<PositionCreateWithoutMarketInput, PositionUncheckedCreateWithoutMarketInput> | PositionCreateWithoutMarketInput[] | PositionUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutMarketInput | PositionCreateOrConnectWithoutMarketInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutMarketInput | PositionUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: PositionCreateManyMarketInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutMarketInput | PositionUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutMarketInput | PositionUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutMarketNestedInput = {
    create?: XOR<OrderCreateWithoutMarketInput, OrderUncheckedCreateWithoutMarketInput> | OrderCreateWithoutMarketInput[] | OrderUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutMarketInput | OrderCreateOrConnectWithoutMarketInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutMarketInput | OrderUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: OrderCreateManyMarketInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutMarketInput | OrderUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutMarketInput | OrderUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type TradeUpdateManyWithoutMarketNestedInput = {
    create?: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput> | TradeCreateWithoutMarketInput[] | TradeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutMarketInput | TradeCreateOrConnectWithoutMarketInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutMarketInput | TradeUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: TradeCreateManyMarketInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutMarketInput | TradeUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutMarketInput | TradeUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type FundingPaymentUpdateManyWithoutMarketNestedInput = {
    create?: XOR<FundingPaymentCreateWithoutMarketInput, FundingPaymentUncheckedCreateWithoutMarketInput> | FundingPaymentCreateWithoutMarketInput[] | FundingPaymentUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: FundingPaymentCreateOrConnectWithoutMarketInput | FundingPaymentCreateOrConnectWithoutMarketInput[]
    upsert?: FundingPaymentUpsertWithWhereUniqueWithoutMarketInput | FundingPaymentUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: FundingPaymentCreateManyMarketInputEnvelope
    set?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    disconnect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    delete?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    connect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    update?: FundingPaymentUpdateWithWhereUniqueWithoutMarketInput | FundingPaymentUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: FundingPaymentUpdateManyWithWhereWithoutMarketInput | FundingPaymentUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: FundingPaymentScalarWhereInput | FundingPaymentScalarWhereInput[]
  }

  export type LiquidationUpdateManyWithoutMarketNestedInput = {
    create?: XOR<LiquidationCreateWithoutMarketInput, LiquidationUncheckedCreateWithoutMarketInput> | LiquidationCreateWithoutMarketInput[] | LiquidationUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: LiquidationCreateOrConnectWithoutMarketInput | LiquidationCreateOrConnectWithoutMarketInput[]
    upsert?: LiquidationUpsertWithWhereUniqueWithoutMarketInput | LiquidationUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: LiquidationCreateManyMarketInputEnvelope
    set?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
    disconnect?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
    delete?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
    connect?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
    update?: LiquidationUpdateWithWhereUniqueWithoutMarketInput | LiquidationUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: LiquidationUpdateManyWithWhereWithoutMarketInput | LiquidationUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: LiquidationScalarWhereInput | LiquidationScalarWhereInput[]
  }

  export type PriceHistoryUpdateManyWithoutMarketNestedInput = {
    create?: XOR<PriceHistoryCreateWithoutMarketInput, PriceHistoryUncheckedCreateWithoutMarketInput> | PriceHistoryCreateWithoutMarketInput[] | PriceHistoryUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PriceHistoryCreateOrConnectWithoutMarketInput | PriceHistoryCreateOrConnectWithoutMarketInput[]
    upsert?: PriceHistoryUpsertWithWhereUniqueWithoutMarketInput | PriceHistoryUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: PriceHistoryCreateManyMarketInputEnvelope
    set?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    disconnect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    delete?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    connect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    update?: PriceHistoryUpdateWithWhereUniqueWithoutMarketInput | PriceHistoryUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: PriceHistoryUpdateManyWithWhereWithoutMarketInput | PriceHistoryUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: PriceHistoryScalarWhereInput | PriceHistoryScalarWhereInput[]
  }

  export type PositionUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<PositionCreateWithoutMarketInput, PositionUncheckedCreateWithoutMarketInput> | PositionCreateWithoutMarketInput[] | PositionUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutMarketInput | PositionCreateOrConnectWithoutMarketInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutMarketInput | PositionUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: PositionCreateManyMarketInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutMarketInput | PositionUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutMarketInput | PositionUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<OrderCreateWithoutMarketInput, OrderUncheckedCreateWithoutMarketInput> | OrderCreateWithoutMarketInput[] | OrderUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutMarketInput | OrderCreateOrConnectWithoutMarketInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutMarketInput | OrderUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: OrderCreateManyMarketInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutMarketInput | OrderUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutMarketInput | OrderUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput> | TradeCreateWithoutMarketInput[] | TradeUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutMarketInput | TradeCreateOrConnectWithoutMarketInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutMarketInput | TradeUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: TradeCreateManyMarketInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutMarketInput | TradeUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutMarketInput | TradeUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type FundingPaymentUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<FundingPaymentCreateWithoutMarketInput, FundingPaymentUncheckedCreateWithoutMarketInput> | FundingPaymentCreateWithoutMarketInput[] | FundingPaymentUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: FundingPaymentCreateOrConnectWithoutMarketInput | FundingPaymentCreateOrConnectWithoutMarketInput[]
    upsert?: FundingPaymentUpsertWithWhereUniqueWithoutMarketInput | FundingPaymentUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: FundingPaymentCreateManyMarketInputEnvelope
    set?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    disconnect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    delete?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    connect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    update?: FundingPaymentUpdateWithWhereUniqueWithoutMarketInput | FundingPaymentUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: FundingPaymentUpdateManyWithWhereWithoutMarketInput | FundingPaymentUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: FundingPaymentScalarWhereInput | FundingPaymentScalarWhereInput[]
  }

  export type LiquidationUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<LiquidationCreateWithoutMarketInput, LiquidationUncheckedCreateWithoutMarketInput> | LiquidationCreateWithoutMarketInput[] | LiquidationUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: LiquidationCreateOrConnectWithoutMarketInput | LiquidationCreateOrConnectWithoutMarketInput[]
    upsert?: LiquidationUpsertWithWhereUniqueWithoutMarketInput | LiquidationUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: LiquidationCreateManyMarketInputEnvelope
    set?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
    disconnect?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
    delete?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
    connect?: LiquidationWhereUniqueInput | LiquidationWhereUniqueInput[]
    update?: LiquidationUpdateWithWhereUniqueWithoutMarketInput | LiquidationUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: LiquidationUpdateManyWithWhereWithoutMarketInput | LiquidationUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: LiquidationScalarWhereInput | LiquidationScalarWhereInput[]
  }

  export type PriceHistoryUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<PriceHistoryCreateWithoutMarketInput, PriceHistoryUncheckedCreateWithoutMarketInput> | PriceHistoryCreateWithoutMarketInput[] | PriceHistoryUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PriceHistoryCreateOrConnectWithoutMarketInput | PriceHistoryCreateOrConnectWithoutMarketInput[]
    upsert?: PriceHistoryUpsertWithWhereUniqueWithoutMarketInput | PriceHistoryUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: PriceHistoryCreateManyMarketInputEnvelope
    set?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    disconnect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    delete?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    connect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    update?: PriceHistoryUpdateWithWhereUniqueWithoutMarketInput | PriceHistoryUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: PriceHistoryUpdateManyWithWhereWithoutMarketInput | PriceHistoryUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: PriceHistoryScalarWhereInput | PriceHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPositionsInput = {
    create?: XOR<UserCreateWithoutPositionsInput, UserUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPositionsInput
    connect?: UserWhereUniqueInput
  }

  export type MarketCreateNestedOneWithoutPositionsInput = {
    create?: XOR<MarketCreateWithoutPositionsInput, MarketUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutPositionsInput
    connect?: MarketWhereUniqueInput
  }

  export type FundingPaymentCreateNestedManyWithoutPositionInput = {
    create?: XOR<FundingPaymentCreateWithoutPositionInput, FundingPaymentUncheckedCreateWithoutPositionInput> | FundingPaymentCreateWithoutPositionInput[] | FundingPaymentUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: FundingPaymentCreateOrConnectWithoutPositionInput | FundingPaymentCreateOrConnectWithoutPositionInput[]
    createMany?: FundingPaymentCreateManyPositionInputEnvelope
    connect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
  }

  export type LiquidationCreateNestedOneWithoutPositionInput = {
    create?: XOR<LiquidationCreateWithoutPositionInput, LiquidationUncheckedCreateWithoutPositionInput>
    connectOrCreate?: LiquidationCreateOrConnectWithoutPositionInput
    connect?: LiquidationWhereUniqueInput
  }

  export type TradeCreateNestedManyWithoutPositionInput = {
    create?: XOR<TradeCreateWithoutPositionInput, TradeUncheckedCreateWithoutPositionInput> | TradeCreateWithoutPositionInput[] | TradeUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutPositionInput | TradeCreateOrConnectWithoutPositionInput[]
    createMany?: TradeCreateManyPositionInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type FundingPaymentUncheckedCreateNestedManyWithoutPositionInput = {
    create?: XOR<FundingPaymentCreateWithoutPositionInput, FundingPaymentUncheckedCreateWithoutPositionInput> | FundingPaymentCreateWithoutPositionInput[] | FundingPaymentUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: FundingPaymentCreateOrConnectWithoutPositionInput | FundingPaymentCreateOrConnectWithoutPositionInput[]
    createMany?: FundingPaymentCreateManyPositionInputEnvelope
    connect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
  }

  export type LiquidationUncheckedCreateNestedOneWithoutPositionInput = {
    create?: XOR<LiquidationCreateWithoutPositionInput, LiquidationUncheckedCreateWithoutPositionInput>
    connectOrCreate?: LiquidationCreateOrConnectWithoutPositionInput
    connect?: LiquidationWhereUniqueInput
  }

  export type TradeUncheckedCreateNestedManyWithoutPositionInput = {
    create?: XOR<TradeCreateWithoutPositionInput, TradeUncheckedCreateWithoutPositionInput> | TradeCreateWithoutPositionInput[] | TradeUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutPositionInput | TradeCreateOrConnectWithoutPositionInput[]
    createMany?: TradeCreateManyPositionInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutPositionsNestedInput = {
    create?: XOR<UserCreateWithoutPositionsInput, UserUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPositionsInput
    upsert?: UserUpsertWithoutPositionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPositionsInput, UserUpdateWithoutPositionsInput>, UserUncheckedUpdateWithoutPositionsInput>
  }

  export type MarketUpdateOneRequiredWithoutPositionsNestedInput = {
    create?: XOR<MarketCreateWithoutPositionsInput, MarketUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutPositionsInput
    upsert?: MarketUpsertWithoutPositionsInput
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutPositionsInput, MarketUpdateWithoutPositionsInput>, MarketUncheckedUpdateWithoutPositionsInput>
  }

  export type FundingPaymentUpdateManyWithoutPositionNestedInput = {
    create?: XOR<FundingPaymentCreateWithoutPositionInput, FundingPaymentUncheckedCreateWithoutPositionInput> | FundingPaymentCreateWithoutPositionInput[] | FundingPaymentUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: FundingPaymentCreateOrConnectWithoutPositionInput | FundingPaymentCreateOrConnectWithoutPositionInput[]
    upsert?: FundingPaymentUpsertWithWhereUniqueWithoutPositionInput | FundingPaymentUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: FundingPaymentCreateManyPositionInputEnvelope
    set?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    disconnect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    delete?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    connect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    update?: FundingPaymentUpdateWithWhereUniqueWithoutPositionInput | FundingPaymentUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: FundingPaymentUpdateManyWithWhereWithoutPositionInput | FundingPaymentUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: FundingPaymentScalarWhereInput | FundingPaymentScalarWhereInput[]
  }

  export type LiquidationUpdateOneWithoutPositionNestedInput = {
    create?: XOR<LiquidationCreateWithoutPositionInput, LiquidationUncheckedCreateWithoutPositionInput>
    connectOrCreate?: LiquidationCreateOrConnectWithoutPositionInput
    upsert?: LiquidationUpsertWithoutPositionInput
    disconnect?: LiquidationWhereInput | boolean
    delete?: LiquidationWhereInput | boolean
    connect?: LiquidationWhereUniqueInput
    update?: XOR<XOR<LiquidationUpdateToOneWithWhereWithoutPositionInput, LiquidationUpdateWithoutPositionInput>, LiquidationUncheckedUpdateWithoutPositionInput>
  }

  export type TradeUpdateManyWithoutPositionNestedInput = {
    create?: XOR<TradeCreateWithoutPositionInput, TradeUncheckedCreateWithoutPositionInput> | TradeCreateWithoutPositionInput[] | TradeUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutPositionInput | TradeCreateOrConnectWithoutPositionInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutPositionInput | TradeUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: TradeCreateManyPositionInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutPositionInput | TradeUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutPositionInput | TradeUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type FundingPaymentUncheckedUpdateManyWithoutPositionNestedInput = {
    create?: XOR<FundingPaymentCreateWithoutPositionInput, FundingPaymentUncheckedCreateWithoutPositionInput> | FundingPaymentCreateWithoutPositionInput[] | FundingPaymentUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: FundingPaymentCreateOrConnectWithoutPositionInput | FundingPaymentCreateOrConnectWithoutPositionInput[]
    upsert?: FundingPaymentUpsertWithWhereUniqueWithoutPositionInput | FundingPaymentUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: FundingPaymentCreateManyPositionInputEnvelope
    set?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    disconnect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    delete?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    connect?: FundingPaymentWhereUniqueInput | FundingPaymentWhereUniqueInput[]
    update?: FundingPaymentUpdateWithWhereUniqueWithoutPositionInput | FundingPaymentUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: FundingPaymentUpdateManyWithWhereWithoutPositionInput | FundingPaymentUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: FundingPaymentScalarWhereInput | FundingPaymentScalarWhereInput[]
  }

  export type LiquidationUncheckedUpdateOneWithoutPositionNestedInput = {
    create?: XOR<LiquidationCreateWithoutPositionInput, LiquidationUncheckedCreateWithoutPositionInput>
    connectOrCreate?: LiquidationCreateOrConnectWithoutPositionInput
    upsert?: LiquidationUpsertWithoutPositionInput
    disconnect?: LiquidationWhereInput | boolean
    delete?: LiquidationWhereInput | boolean
    connect?: LiquidationWhereUniqueInput
    update?: XOR<XOR<LiquidationUpdateToOneWithWhereWithoutPositionInput, LiquidationUpdateWithoutPositionInput>, LiquidationUncheckedUpdateWithoutPositionInput>
  }

  export type TradeUncheckedUpdateManyWithoutPositionNestedInput = {
    create?: XOR<TradeCreateWithoutPositionInput, TradeUncheckedCreateWithoutPositionInput> | TradeCreateWithoutPositionInput[] | TradeUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutPositionInput | TradeCreateOrConnectWithoutPositionInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutPositionInput | TradeUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: TradeCreateManyPositionInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutPositionInput | TradeUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutPositionInput | TradeUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type MarketCreateNestedOneWithoutOrdersInput = {
    create?: XOR<MarketCreateWithoutOrdersInput, MarketUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: MarketCreateOrConnectWithoutOrdersInput
    connect?: MarketWhereUniqueInput
  }

  export type TradeCreateNestedManyWithoutOrderInput = {
    create?: XOR<TradeCreateWithoutOrderInput, TradeUncheckedCreateWithoutOrderInput> | TradeCreateWithoutOrderInput[] | TradeUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutOrderInput | TradeCreateOrConnectWithoutOrderInput[]
    createMany?: TradeCreateManyOrderInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<TradeCreateWithoutOrderInput, TradeUncheckedCreateWithoutOrderInput> | TradeCreateWithoutOrderInput[] | TradeUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutOrderInput | TradeCreateOrConnectWithoutOrderInput[]
    createMany?: TradeCreateManyOrderInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type MarketUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<MarketCreateWithoutOrdersInput, MarketUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: MarketCreateOrConnectWithoutOrdersInput
    upsert?: MarketUpsertWithoutOrdersInput
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutOrdersInput, MarketUpdateWithoutOrdersInput>, MarketUncheckedUpdateWithoutOrdersInput>
  }

  export type TradeUpdateManyWithoutOrderNestedInput = {
    create?: XOR<TradeCreateWithoutOrderInput, TradeUncheckedCreateWithoutOrderInput> | TradeCreateWithoutOrderInput[] | TradeUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutOrderInput | TradeCreateOrConnectWithoutOrderInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutOrderInput | TradeUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: TradeCreateManyOrderInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutOrderInput | TradeUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutOrderInput | TradeUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<TradeCreateWithoutOrderInput, TradeUncheckedCreateWithoutOrderInput> | TradeCreateWithoutOrderInput[] | TradeUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutOrderInput | TradeCreateOrConnectWithoutOrderInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutOrderInput | TradeUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: TradeCreateManyOrderInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutOrderInput | TradeUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutOrderInput | TradeUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutTradesInput = {
    create?: XOR<OrderCreateWithoutTradesInput, OrderUncheckedCreateWithoutTradesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutTradesInput
    connect?: OrderWhereUniqueInput
  }

  export type PositionCreateNestedOneWithoutTradesInput = {
    create?: XOR<PositionCreateWithoutTradesInput, PositionUncheckedCreateWithoutTradesInput>
    connectOrCreate?: PositionCreateOrConnectWithoutTradesInput
    connect?: PositionWhereUniqueInput
  }

  export type MarketCreateNestedOneWithoutTradesInput = {
    create?: XOR<MarketCreateWithoutTradesInput, MarketUncheckedCreateWithoutTradesInput>
    connectOrCreate?: MarketCreateOrConnectWithoutTradesInput
    connect?: MarketWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTradesInput = {
    create?: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumOrderSideFieldUpdateOperationsInput = {
    set?: $Enums.OrderSide
  }

  export type OrderUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<OrderCreateWithoutTradesInput, OrderUncheckedCreateWithoutTradesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutTradesInput
    upsert?: OrderUpsertWithoutTradesInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutTradesInput, OrderUpdateWithoutTradesInput>, OrderUncheckedUpdateWithoutTradesInput>
  }

  export type PositionUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<PositionCreateWithoutTradesInput, PositionUncheckedCreateWithoutTradesInput>
    connectOrCreate?: PositionCreateOrConnectWithoutTradesInput
    upsert?: PositionUpsertWithoutTradesInput
    connect?: PositionWhereUniqueInput
    update?: XOR<XOR<PositionUpdateToOneWithWhereWithoutTradesInput, PositionUpdateWithoutTradesInput>, PositionUncheckedUpdateWithoutTradesInput>
  }

  export type MarketUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<MarketCreateWithoutTradesInput, MarketUncheckedCreateWithoutTradesInput>
    connectOrCreate?: MarketCreateOrConnectWithoutTradesInput
    upsert?: MarketUpsertWithoutTradesInput
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutTradesInput, MarketUpdateWithoutTradesInput>, MarketUncheckedUpdateWithoutTradesInput>
  }

  export type UserUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradesInput
    upsert?: UserUpsertWithoutTradesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTradesInput, UserUpdateWithoutTradesInput>, UserUncheckedUpdateWithoutTradesInput>
  }

  export type MarketCreateNestedOneWithoutFundingPaymentsInput = {
    create?: XOR<MarketCreateWithoutFundingPaymentsInput, MarketUncheckedCreateWithoutFundingPaymentsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutFundingPaymentsInput
    connect?: MarketWhereUniqueInput
  }

  export type PositionCreateNestedOneWithoutFundingPaymentsInput = {
    create?: XOR<PositionCreateWithoutFundingPaymentsInput, PositionUncheckedCreateWithoutFundingPaymentsInput>
    connectOrCreate?: PositionCreateOrConnectWithoutFundingPaymentsInput
    connect?: PositionWhereUniqueInput
  }

  export type MarketUpdateOneRequiredWithoutFundingPaymentsNestedInput = {
    create?: XOR<MarketCreateWithoutFundingPaymentsInput, MarketUncheckedCreateWithoutFundingPaymentsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutFundingPaymentsInput
    upsert?: MarketUpsertWithoutFundingPaymentsInput
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutFundingPaymentsInput, MarketUpdateWithoutFundingPaymentsInput>, MarketUncheckedUpdateWithoutFundingPaymentsInput>
  }

  export type PositionUpdateOneRequiredWithoutFundingPaymentsNestedInput = {
    create?: XOR<PositionCreateWithoutFundingPaymentsInput, PositionUncheckedCreateWithoutFundingPaymentsInput>
    connectOrCreate?: PositionCreateOrConnectWithoutFundingPaymentsInput
    upsert?: PositionUpsertWithoutFundingPaymentsInput
    connect?: PositionWhereUniqueInput
    update?: XOR<XOR<PositionUpdateToOneWithWhereWithoutFundingPaymentsInput, PositionUpdateWithoutFundingPaymentsInput>, PositionUncheckedUpdateWithoutFundingPaymentsInput>
  }

  export type PositionCreateNestedOneWithoutLiquidationInput = {
    create?: XOR<PositionCreateWithoutLiquidationInput, PositionUncheckedCreateWithoutLiquidationInput>
    connectOrCreate?: PositionCreateOrConnectWithoutLiquidationInput
    connect?: PositionWhereUniqueInput
  }

  export type MarketCreateNestedOneWithoutLiquidationsInput = {
    create?: XOR<MarketCreateWithoutLiquidationsInput, MarketUncheckedCreateWithoutLiquidationsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutLiquidationsInput
    connect?: MarketWhereUniqueInput
  }

  export type PositionUpdateOneRequiredWithoutLiquidationNestedInput = {
    create?: XOR<PositionCreateWithoutLiquidationInput, PositionUncheckedCreateWithoutLiquidationInput>
    connectOrCreate?: PositionCreateOrConnectWithoutLiquidationInput
    upsert?: PositionUpsertWithoutLiquidationInput
    connect?: PositionWhereUniqueInput
    update?: XOR<XOR<PositionUpdateToOneWithWhereWithoutLiquidationInput, PositionUpdateWithoutLiquidationInput>, PositionUncheckedUpdateWithoutLiquidationInput>
  }

  export type MarketUpdateOneRequiredWithoutLiquidationsNestedInput = {
    create?: XOR<MarketCreateWithoutLiquidationsInput, MarketUncheckedCreateWithoutLiquidationsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutLiquidationsInput
    upsert?: MarketUpsertWithoutLiquidationsInput
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutLiquidationsInput, MarketUpdateWithoutLiquidationsInput>, MarketUncheckedUpdateWithoutLiquidationsInput>
  }

  export type MarketCreateNestedOneWithoutPriceHistoryInput = {
    create?: XOR<MarketCreateWithoutPriceHistoryInput, MarketUncheckedCreateWithoutPriceHistoryInput>
    connectOrCreate?: MarketCreateOrConnectWithoutPriceHistoryInput
    connect?: MarketWhereUniqueInput
  }

  export type MarketUpdateOneRequiredWithoutPriceHistoryNestedInput = {
    create?: XOR<MarketCreateWithoutPriceHistoryInput, MarketUncheckedCreateWithoutPriceHistoryInput>
    connectOrCreate?: MarketCreateOrConnectWithoutPriceHistoryInput
    upsert?: MarketUpsertWithoutPriceHistoryInput
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutPriceHistoryInput, MarketUpdateWithoutPriceHistoryInput>, MarketUncheckedUpdateWithoutPriceHistoryInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumOrderSideFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideFilter<$PrismaModel> | $Enums.OrderSide
  }

  export type NestedEnumOrderSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideWithAggregatesFilter<$PrismaModel> | $Enums.OrderSide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderSideFilter<$PrismaModel>
    _max?: NestedEnumOrderSideFilter<$PrismaModel>
  }

  export type PositionCreateWithoutUserInput = {
    id: string
    positionAddress: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    market: MarketCreateNestedOneWithoutPositionsInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutPositionInput
    liquidation?: LiquidationCreateNestedOneWithoutPositionInput
    trades?: TradeCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateWithoutUserInput = {
    id: string
    positionAddress: string
    marketId: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutPositionInput
    liquidation?: LiquidationUncheckedCreateNestedOneWithoutPositionInput
    trades?: TradeUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionCreateOrConnectWithoutUserInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutUserInput, PositionUncheckedCreateWithoutUserInput>
  }

  export type PositionCreateManyUserInputEnvelope = {
    data: PositionCreateManyUserInput | PositionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutUserInput = {
    id: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
    market: MarketCreateNestedOneWithoutOrdersInput
    trades?: TradeCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id: string
    marketId: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
    trades?: TradeUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TradeCreateWithoutUserInput = {
    id: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutTradesInput
    position: PositionCreateNestedOneWithoutTradesInput
    market: MarketCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateWithoutUserInput = {
    id: string
    orderId: string
    positionId: string
    marketId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutUserInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput>
  }

  export type TradeCreateManyUserInputEnvelope = {
    data: TradeCreateManyUserInput | TradeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PositionUpsertWithWhereUniqueWithoutUserInput = {
    where: PositionWhereUniqueInput
    update: XOR<PositionUpdateWithoutUserInput, PositionUncheckedUpdateWithoutUserInput>
    create: XOR<PositionCreateWithoutUserInput, PositionUncheckedCreateWithoutUserInput>
  }

  export type PositionUpdateWithWhereUniqueWithoutUserInput = {
    where: PositionWhereUniqueInput
    data: XOR<PositionUpdateWithoutUserInput, PositionUncheckedUpdateWithoutUserInput>
  }

  export type PositionUpdateManyWithWhereWithoutUserInput = {
    where: PositionScalarWhereInput
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyWithoutUserInput>
  }

  export type PositionScalarWhereInput = {
    AND?: PositionScalarWhereInput | PositionScalarWhereInput[]
    OR?: PositionScalarWhereInput[]
    NOT?: PositionScalarWhereInput | PositionScalarWhereInput[]
    id?: StringFilter<"Position"> | string
    positionAddress?: StringFilter<"Position"> | string
    userId?: StringFilter<"Position"> | string
    marketId?: StringFilter<"Position"> | string
    isLong?: BoolFilter<"Position"> | boolean
    size?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    leverage?: IntFilter<"Position"> | number
    openedAt?: BigIntFilter<"Position"> | bigint | number
    lastFundingTs?: BigIntFilter<"Position"> | bigint | number
    realizedPnlFromFunding?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFilter<"Position"> | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFilter<"Position"> | boolean
    closedAt?: BigIntNullableFilter<"Position"> | bigint | number | null
    closingPrice?: DecimalNullableFilter<"Position"> | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: DecimalNullableFilter<"Position"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Position"> | Date | string
    updatedAt?: DateTimeFilter<"Position"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    marketId?: StringFilter<"Order"> | string
    orderType?: IntFilter<"Order"> | number
    isLong?: BoolFilter<"Order"> | boolean
    size?: StringFilter<"Order"> | string
    price?: StringFilter<"Order"> | string
    collateral?: StringFilter<"Order"> | string
    leverage?: IntFilter<"Order"> | number
    isActive?: BoolFilter<"Order"> | boolean
    maxSlippageBps?: IntFilter<"Order"> | number
    createdAt?: StringFilter<"Order"> | string
    positionId?: StringNullableFilter<"Order"> | string | null
    executionPrice?: StringNullableFilter<"Order"> | string | null
    executedAt?: StringNullableFilter<"Order"> | string | null
    cancelledAt?: StringNullableFilter<"Order"> | string | null
    txHash?: StringNullableFilter<"Order"> | string | null
    lastError?: StringNullableFilter<"Order"> | string | null
  }

  export type TradeUpsertWithWhereUniqueWithoutUserInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutUserInput, TradeUncheckedUpdateWithoutUserInput>
    create: XOR<TradeCreateWithoutUserInput, TradeUncheckedCreateWithoutUserInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutUserInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutUserInput, TradeUncheckedUpdateWithoutUserInput>
  }

  export type TradeUpdateManyWithWhereWithoutUserInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutUserInput>
  }

  export type TradeScalarWhereInput = {
    AND?: TradeScalarWhereInput | TradeScalarWhereInput[]
    OR?: TradeScalarWhereInput[]
    NOT?: TradeScalarWhereInput | TradeScalarWhereInput[]
    id?: StringFilter<"Trade"> | string
    orderId?: StringFilter<"Trade"> | string
    positionId?: StringFilter<"Trade"> | string
    userId?: StringFilter<"Trade"> | string
    marketId?: StringFilter<"Trade"> | string
    side?: EnumOrderSideFilter<"Trade"> | $Enums.OrderSide
    size?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    price?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    txHash?: StringFilter<"Trade"> | string
    createdAt?: DateTimeFilter<"Trade"> | Date | string
  }

  export type PositionCreateWithoutMarketInput = {
    id: string
    positionAddress: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPositionsInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutPositionInput
    liquidation?: LiquidationCreateNestedOneWithoutPositionInput
    trades?: TradeCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateWithoutMarketInput = {
    id: string
    positionAddress: string
    userId: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutPositionInput
    liquidation?: LiquidationUncheckedCreateNestedOneWithoutPositionInput
    trades?: TradeUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionCreateOrConnectWithoutMarketInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutMarketInput, PositionUncheckedCreateWithoutMarketInput>
  }

  export type PositionCreateManyMarketInputEnvelope = {
    data: PositionCreateManyMarketInput | PositionCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutMarketInput = {
    id: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
    user: UserCreateNestedOneWithoutOrdersInput
    trades?: TradeCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutMarketInput = {
    id: string
    userId: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
    trades?: TradeUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutMarketInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutMarketInput, OrderUncheckedCreateWithoutMarketInput>
  }

  export type OrderCreateManyMarketInputEnvelope = {
    data: OrderCreateManyMarketInput | OrderCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type TradeCreateWithoutMarketInput = {
    id: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutTradesInput
    position: PositionCreateNestedOneWithoutTradesInput
    user: UserCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateWithoutMarketInput = {
    id: string
    orderId: string
    positionId: string
    userId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutMarketInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput>
  }

  export type TradeCreateManyMarketInputEnvelope = {
    data: TradeCreateManyMarketInput | TradeCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type FundingPaymentCreateWithoutMarketInput = {
    id: string
    amount: Decimal | DecimalJsLike | number | string
    rate: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    txHash?: string | null
    createdAt?: Date | string
    position: PositionCreateNestedOneWithoutFundingPaymentsInput
  }

  export type FundingPaymentUncheckedCreateWithoutMarketInput = {
    id: string
    positionId: string
    amount: Decimal | DecimalJsLike | number | string
    rate: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    txHash?: string | null
    createdAt?: Date | string
  }

  export type FundingPaymentCreateOrConnectWithoutMarketInput = {
    where: FundingPaymentWhereUniqueInput
    create: XOR<FundingPaymentCreateWithoutMarketInput, FundingPaymentUncheckedCreateWithoutMarketInput>
  }

  export type FundingPaymentCreateManyMarketInputEnvelope = {
    data: FundingPaymentCreateManyMarketInput | FundingPaymentCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type LiquidationCreateWithoutMarketInput = {
    id: string
    liquidator?: string | null
    liquidationPrice: Decimal | DecimalJsLike | number | string
    collateralReturned: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    timestamp: bigint | number
    createdAt?: Date | string
    position: PositionCreateNestedOneWithoutLiquidationInput
  }

  export type LiquidationUncheckedCreateWithoutMarketInput = {
    id: string
    positionId: string
    liquidator?: string | null
    liquidationPrice: Decimal | DecimalJsLike | number | string
    collateralReturned: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type LiquidationCreateOrConnectWithoutMarketInput = {
    where: LiquidationWhereUniqueInput
    create: XOR<LiquidationCreateWithoutMarketInput, LiquidationUncheckedCreateWithoutMarketInput>
  }

  export type LiquidationCreateManyMarketInputEnvelope = {
    data: LiquidationCreateManyMarketInput | LiquidationCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type PriceHistoryCreateWithoutMarketInput = {
    id?: string
    markPrice: Decimal | DecimalJsLike | number | string
    indexPrice: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type PriceHistoryUncheckedCreateWithoutMarketInput = {
    id?: string
    markPrice: Decimal | DecimalJsLike | number | string
    indexPrice: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type PriceHistoryCreateOrConnectWithoutMarketInput = {
    where: PriceHistoryWhereUniqueInput
    create: XOR<PriceHistoryCreateWithoutMarketInput, PriceHistoryUncheckedCreateWithoutMarketInput>
  }

  export type PriceHistoryCreateManyMarketInputEnvelope = {
    data: PriceHistoryCreateManyMarketInput | PriceHistoryCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type PositionUpsertWithWhereUniqueWithoutMarketInput = {
    where: PositionWhereUniqueInput
    update: XOR<PositionUpdateWithoutMarketInput, PositionUncheckedUpdateWithoutMarketInput>
    create: XOR<PositionCreateWithoutMarketInput, PositionUncheckedCreateWithoutMarketInput>
  }

  export type PositionUpdateWithWhereUniqueWithoutMarketInput = {
    where: PositionWhereUniqueInput
    data: XOR<PositionUpdateWithoutMarketInput, PositionUncheckedUpdateWithoutMarketInput>
  }

  export type PositionUpdateManyWithWhereWithoutMarketInput = {
    where: PositionScalarWhereInput
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyWithoutMarketInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutMarketInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutMarketInput, OrderUncheckedUpdateWithoutMarketInput>
    create: XOR<OrderCreateWithoutMarketInput, OrderUncheckedCreateWithoutMarketInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutMarketInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutMarketInput, OrderUncheckedUpdateWithoutMarketInput>
  }

  export type OrderUpdateManyWithWhereWithoutMarketInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutMarketInput>
  }

  export type TradeUpsertWithWhereUniqueWithoutMarketInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutMarketInput, TradeUncheckedUpdateWithoutMarketInput>
    create: XOR<TradeCreateWithoutMarketInput, TradeUncheckedCreateWithoutMarketInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutMarketInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutMarketInput, TradeUncheckedUpdateWithoutMarketInput>
  }

  export type TradeUpdateManyWithWhereWithoutMarketInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutMarketInput>
  }

  export type FundingPaymentUpsertWithWhereUniqueWithoutMarketInput = {
    where: FundingPaymentWhereUniqueInput
    update: XOR<FundingPaymentUpdateWithoutMarketInput, FundingPaymentUncheckedUpdateWithoutMarketInput>
    create: XOR<FundingPaymentCreateWithoutMarketInput, FundingPaymentUncheckedCreateWithoutMarketInput>
  }

  export type FundingPaymentUpdateWithWhereUniqueWithoutMarketInput = {
    where: FundingPaymentWhereUniqueInput
    data: XOR<FundingPaymentUpdateWithoutMarketInput, FundingPaymentUncheckedUpdateWithoutMarketInput>
  }

  export type FundingPaymentUpdateManyWithWhereWithoutMarketInput = {
    where: FundingPaymentScalarWhereInput
    data: XOR<FundingPaymentUpdateManyMutationInput, FundingPaymentUncheckedUpdateManyWithoutMarketInput>
  }

  export type FundingPaymentScalarWhereInput = {
    AND?: FundingPaymentScalarWhereInput | FundingPaymentScalarWhereInput[]
    OR?: FundingPaymentScalarWhereInput[]
    NOT?: FundingPaymentScalarWhereInput | FundingPaymentScalarWhereInput[]
    id?: StringFilter<"FundingPayment"> | string
    marketId?: StringFilter<"FundingPayment"> | string
    positionId?: StringFilter<"FundingPayment"> | string
    amount?: DecimalFilter<"FundingPayment"> | Decimal | DecimalJsLike | number | string
    rate?: DecimalFilter<"FundingPayment"> | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFilter<"FundingPayment"> | bigint | number
    txHash?: StringNullableFilter<"FundingPayment"> | string | null
    createdAt?: DateTimeFilter<"FundingPayment"> | Date | string
  }

  export type LiquidationUpsertWithWhereUniqueWithoutMarketInput = {
    where: LiquidationWhereUniqueInput
    update: XOR<LiquidationUpdateWithoutMarketInput, LiquidationUncheckedUpdateWithoutMarketInput>
    create: XOR<LiquidationCreateWithoutMarketInput, LiquidationUncheckedCreateWithoutMarketInput>
  }

  export type LiquidationUpdateWithWhereUniqueWithoutMarketInput = {
    where: LiquidationWhereUniqueInput
    data: XOR<LiquidationUpdateWithoutMarketInput, LiquidationUncheckedUpdateWithoutMarketInput>
  }

  export type LiquidationUpdateManyWithWhereWithoutMarketInput = {
    where: LiquidationScalarWhereInput
    data: XOR<LiquidationUpdateManyMutationInput, LiquidationUncheckedUpdateManyWithoutMarketInput>
  }

  export type LiquidationScalarWhereInput = {
    AND?: LiquidationScalarWhereInput | LiquidationScalarWhereInput[]
    OR?: LiquidationScalarWhereInput[]
    NOT?: LiquidationScalarWhereInput | LiquidationScalarWhereInput[]
    id?: StringFilter<"Liquidation"> | string
    positionId?: StringFilter<"Liquidation"> | string
    liquidator?: StringNullableFilter<"Liquidation"> | string | null
    liquidationPrice?: DecimalFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalFilter<"Liquidation"> | Decimal | DecimalJsLike | number | string
    txHash?: StringFilter<"Liquidation"> | string
    timestamp?: BigIntFilter<"Liquidation"> | bigint | number
    createdAt?: DateTimeFilter<"Liquidation"> | Date | string
    marketId?: StringFilter<"Liquidation"> | string
  }

  export type PriceHistoryUpsertWithWhereUniqueWithoutMarketInput = {
    where: PriceHistoryWhereUniqueInput
    update: XOR<PriceHistoryUpdateWithoutMarketInput, PriceHistoryUncheckedUpdateWithoutMarketInput>
    create: XOR<PriceHistoryCreateWithoutMarketInput, PriceHistoryUncheckedCreateWithoutMarketInput>
  }

  export type PriceHistoryUpdateWithWhereUniqueWithoutMarketInput = {
    where: PriceHistoryWhereUniqueInput
    data: XOR<PriceHistoryUpdateWithoutMarketInput, PriceHistoryUncheckedUpdateWithoutMarketInput>
  }

  export type PriceHistoryUpdateManyWithWhereWithoutMarketInput = {
    where: PriceHistoryScalarWhereInput
    data: XOR<PriceHistoryUpdateManyMutationInput, PriceHistoryUncheckedUpdateManyWithoutMarketInput>
  }

  export type PriceHistoryScalarWhereInput = {
    AND?: PriceHistoryScalarWhereInput | PriceHistoryScalarWhereInput[]
    OR?: PriceHistoryScalarWhereInput[]
    NOT?: PriceHistoryScalarWhereInput | PriceHistoryScalarWhereInput[]
    id?: StringFilter<"PriceHistory"> | string
    marketId?: StringFilter<"PriceHistory"> | string
    markPrice?: DecimalFilter<"PriceHistory"> | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFilter<"PriceHistory"> | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFilter<"PriceHistory"> | bigint | number
    createdAt?: DateTimeFilter<"PriceHistory"> | Date | string
  }

  export type UserCreateWithoutPositionsInput = {
    id: string
    publicKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    trades?: TradeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPositionsInput = {
    id: string
    publicKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPositionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPositionsInput, UserUncheckedCreateWithoutPositionsInput>
  }

  export type MarketCreateWithoutPositionsInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutMarketInput
    trades?: TradeCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutPositionsInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutMarketInput
    trades?: TradeUncheckedCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationUncheckedCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutPositionsInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutPositionsInput, MarketUncheckedCreateWithoutPositionsInput>
  }

  export type FundingPaymentCreateWithoutPositionInput = {
    id: string
    amount: Decimal | DecimalJsLike | number | string
    rate: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    txHash?: string | null
    createdAt?: Date | string
    market: MarketCreateNestedOneWithoutFundingPaymentsInput
  }

  export type FundingPaymentUncheckedCreateWithoutPositionInput = {
    id: string
    marketId: string
    amount: Decimal | DecimalJsLike | number | string
    rate: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    txHash?: string | null
    createdAt?: Date | string
  }

  export type FundingPaymentCreateOrConnectWithoutPositionInput = {
    where: FundingPaymentWhereUniqueInput
    create: XOR<FundingPaymentCreateWithoutPositionInput, FundingPaymentUncheckedCreateWithoutPositionInput>
  }

  export type FundingPaymentCreateManyPositionInputEnvelope = {
    data: FundingPaymentCreateManyPositionInput | FundingPaymentCreateManyPositionInput[]
    skipDuplicates?: boolean
  }

  export type LiquidationCreateWithoutPositionInput = {
    id: string
    liquidator?: string | null
    liquidationPrice: Decimal | DecimalJsLike | number | string
    collateralReturned: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    timestamp: bigint | number
    createdAt?: Date | string
    market: MarketCreateNestedOneWithoutLiquidationsInput
  }

  export type LiquidationUncheckedCreateWithoutPositionInput = {
    id: string
    liquidator?: string | null
    liquidationPrice: Decimal | DecimalJsLike | number | string
    collateralReturned: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    timestamp: bigint | number
    createdAt?: Date | string
    marketId: string
  }

  export type LiquidationCreateOrConnectWithoutPositionInput = {
    where: LiquidationWhereUniqueInput
    create: XOR<LiquidationCreateWithoutPositionInput, LiquidationUncheckedCreateWithoutPositionInput>
  }

  export type TradeCreateWithoutPositionInput = {
    id: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutTradesInput
    market: MarketCreateNestedOneWithoutTradesInput
    user: UserCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateWithoutPositionInput = {
    id: string
    orderId: string
    userId: string
    marketId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutPositionInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutPositionInput, TradeUncheckedCreateWithoutPositionInput>
  }

  export type TradeCreateManyPositionInputEnvelope = {
    data: TradeCreateManyPositionInput | TradeCreateManyPositionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPositionsInput = {
    update: XOR<UserUpdateWithoutPositionsInput, UserUncheckedUpdateWithoutPositionsInput>
    create: XOR<UserCreateWithoutPositionsInput, UserUncheckedCreateWithoutPositionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPositionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPositionsInput, UserUncheckedUpdateWithoutPositionsInput>
  }

  export type UserUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    trades?: TradeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MarketUpsertWithoutPositionsInput = {
    update: XOR<MarketUpdateWithoutPositionsInput, MarketUncheckedUpdateWithoutPositionsInput>
    create: XOR<MarketCreateWithoutPositionsInput, MarketUncheckedCreateWithoutPositionsInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutPositionsInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutPositionsInput, MarketUncheckedUpdateWithoutPositionsInput>
  }

  export type MarketUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutMarketNestedInput
    trades?: TradeUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutMarketNestedInput
    trades?: TradeUncheckedUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUncheckedUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type FundingPaymentUpsertWithWhereUniqueWithoutPositionInput = {
    where: FundingPaymentWhereUniqueInput
    update: XOR<FundingPaymentUpdateWithoutPositionInput, FundingPaymentUncheckedUpdateWithoutPositionInput>
    create: XOR<FundingPaymentCreateWithoutPositionInput, FundingPaymentUncheckedCreateWithoutPositionInput>
  }

  export type FundingPaymentUpdateWithWhereUniqueWithoutPositionInput = {
    where: FundingPaymentWhereUniqueInput
    data: XOR<FundingPaymentUpdateWithoutPositionInput, FundingPaymentUncheckedUpdateWithoutPositionInput>
  }

  export type FundingPaymentUpdateManyWithWhereWithoutPositionInput = {
    where: FundingPaymentScalarWhereInput
    data: XOR<FundingPaymentUpdateManyMutationInput, FundingPaymentUncheckedUpdateManyWithoutPositionInput>
  }

  export type LiquidationUpsertWithoutPositionInput = {
    update: XOR<LiquidationUpdateWithoutPositionInput, LiquidationUncheckedUpdateWithoutPositionInput>
    create: XOR<LiquidationCreateWithoutPositionInput, LiquidationUncheckedCreateWithoutPositionInput>
    where?: LiquidationWhereInput
  }

  export type LiquidationUpdateToOneWithWhereWithoutPositionInput = {
    where?: LiquidationWhereInput
    data: XOR<LiquidationUpdateWithoutPositionInput, LiquidationUncheckedUpdateWithoutPositionInput>
  }

  export type LiquidationUpdateWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    liquidator?: NullableStringFieldUpdateOperationsInput | string | null
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutLiquidationsNestedInput
  }

  export type LiquidationUncheckedUpdateWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    liquidator?: NullableStringFieldUpdateOperationsInput | string | null
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marketId?: StringFieldUpdateOperationsInput | string
  }

  export type TradeUpsertWithWhereUniqueWithoutPositionInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutPositionInput, TradeUncheckedUpdateWithoutPositionInput>
    create: XOR<TradeCreateWithoutPositionInput, TradeUncheckedCreateWithoutPositionInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutPositionInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutPositionInput, TradeUncheckedUpdateWithoutPositionInput>
  }

  export type TradeUpdateManyWithWhereWithoutPositionInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutPositionInput>
  }

  export type UserCreateWithoutOrdersInput = {
    id: string
    publicKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionCreateNestedManyWithoutUserInput
    trades?: TradeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id: string
    publicKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutUserInput
    trades?: TradeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type MarketCreateWithoutOrdersInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionCreateNestedManyWithoutMarketInput
    trades?: TradeCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutOrdersInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutMarketInput
    trades?: TradeUncheckedCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationUncheckedCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutOrdersInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutOrdersInput, MarketUncheckedCreateWithoutOrdersInput>
  }

  export type TradeCreateWithoutOrderInput = {
    id: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
    position: PositionCreateNestedOneWithoutTradesInput
    market: MarketCreateNestedOneWithoutTradesInput
    user: UserCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateWithoutOrderInput = {
    id: string
    positionId: string
    userId: string
    marketId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutOrderInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutOrderInput, TradeUncheckedCreateWithoutOrderInput>
  }

  export type TradeCreateManyOrderInputEnvelope = {
    data: TradeCreateManyOrderInput | TradeCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutUserNestedInput
    trades?: TradeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutUserNestedInput
    trades?: TradeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MarketUpsertWithoutOrdersInput = {
    update: XOR<MarketUpdateWithoutOrdersInput, MarketUncheckedUpdateWithoutOrdersInput>
    create: XOR<MarketCreateWithoutOrdersInput, MarketUncheckedCreateWithoutOrdersInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutOrdersInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutOrdersInput, MarketUncheckedUpdateWithoutOrdersInput>
  }

  export type MarketUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutMarketNestedInput
    trades?: TradeUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutMarketNestedInput
    trades?: TradeUncheckedUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUncheckedUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type TradeUpsertWithWhereUniqueWithoutOrderInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutOrderInput, TradeUncheckedUpdateWithoutOrderInput>
    create: XOR<TradeCreateWithoutOrderInput, TradeUncheckedCreateWithoutOrderInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutOrderInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutOrderInput, TradeUncheckedUpdateWithoutOrderInput>
  }

  export type TradeUpdateManyWithWhereWithoutOrderInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderCreateWithoutTradesInput = {
    id: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
    user: UserCreateNestedOneWithoutOrdersInput
    market: MarketCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutTradesInput = {
    id: string
    userId: string
    marketId: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
  }

  export type OrderCreateOrConnectWithoutTradesInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutTradesInput, OrderUncheckedCreateWithoutTradesInput>
  }

  export type PositionCreateWithoutTradesInput = {
    id: string
    positionAddress: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPositionsInput
    market: MarketCreateNestedOneWithoutPositionsInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutPositionInput
    liquidation?: LiquidationCreateNestedOneWithoutPositionInput
  }

  export type PositionUncheckedCreateWithoutTradesInput = {
    id: string
    positionAddress: string
    userId: string
    marketId: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutPositionInput
    liquidation?: LiquidationUncheckedCreateNestedOneWithoutPositionInput
  }

  export type PositionCreateOrConnectWithoutTradesInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutTradesInput, PositionUncheckedCreateWithoutTradesInput>
  }

  export type MarketCreateWithoutTradesInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionCreateNestedManyWithoutMarketInput
    orders?: OrderCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutTradesInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutMarketInput
    orders?: OrderUncheckedCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationUncheckedCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutTradesInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutTradesInput, MarketUncheckedCreateWithoutTradesInput>
  }

  export type UserCreateWithoutTradesInput = {
    id: string
    publicKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTradesInput = {
    id: string
    publicKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTradesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
  }

  export type OrderUpsertWithoutTradesInput = {
    update: XOR<OrderUpdateWithoutTradesInput, OrderUncheckedUpdateWithoutTradesInput>
    create: XOR<OrderCreateWithoutTradesInput, OrderUncheckedCreateWithoutTradesInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutTradesInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutTradesInput, OrderUncheckedUpdateWithoutTradesInput>
  }

  export type OrderUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    market?: MarketUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PositionUpsertWithoutTradesInput = {
    update: XOR<PositionUpdateWithoutTradesInput, PositionUncheckedUpdateWithoutTradesInput>
    create: XOR<PositionCreateWithoutTradesInput, PositionUncheckedCreateWithoutTradesInput>
    where?: PositionWhereInput
  }

  export type PositionUpdateToOneWithWhereWithoutTradesInput = {
    where?: PositionWhereInput
    data: XOR<PositionUpdateWithoutTradesInput, PositionUncheckedUpdateWithoutTradesInput>
  }

  export type PositionUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPositionsNestedInput
    market?: MarketUpdateOneRequiredWithoutPositionsNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutPositionNestedInput
    liquidation?: LiquidationUpdateOneWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutPositionNestedInput
    liquidation?: LiquidationUncheckedUpdateOneWithoutPositionNestedInput
  }

  export type MarketUpsertWithoutTradesInput = {
    update: XOR<MarketUpdateWithoutTradesInput, MarketUncheckedUpdateWithoutTradesInput>
    create: XOR<MarketCreateWithoutTradesInput, MarketUncheckedCreateWithoutTradesInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutTradesInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutTradesInput, MarketUncheckedUpdateWithoutTradesInput>
  }

  export type MarketUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutMarketNestedInput
    orders?: OrderUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutMarketNestedInput
    orders?: OrderUncheckedUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUncheckedUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type UserUpsertWithoutTradesInput = {
    update: XOR<UserUpdateWithoutTradesInput, UserUncheckedUpdateWithoutTradesInput>
    create: XOR<UserCreateWithoutTradesInput, UserUncheckedCreateWithoutTradesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTradesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTradesInput, UserUncheckedUpdateWithoutTradesInput>
  }

  export type UserUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MarketCreateWithoutFundingPaymentsInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionCreateNestedManyWithoutMarketInput
    orders?: OrderCreateNestedManyWithoutMarketInput
    trades?: TradeCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutFundingPaymentsInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutMarketInput
    orders?: OrderUncheckedCreateNestedManyWithoutMarketInput
    trades?: TradeUncheckedCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationUncheckedCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutFundingPaymentsInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutFundingPaymentsInput, MarketUncheckedCreateWithoutFundingPaymentsInput>
  }

  export type PositionCreateWithoutFundingPaymentsInput = {
    id: string
    positionAddress: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPositionsInput
    market: MarketCreateNestedOneWithoutPositionsInput
    liquidation?: LiquidationCreateNestedOneWithoutPositionInput
    trades?: TradeCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateWithoutFundingPaymentsInput = {
    id: string
    positionAddress: string
    userId: string
    marketId: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    liquidation?: LiquidationUncheckedCreateNestedOneWithoutPositionInput
    trades?: TradeUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionCreateOrConnectWithoutFundingPaymentsInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutFundingPaymentsInput, PositionUncheckedCreateWithoutFundingPaymentsInput>
  }

  export type MarketUpsertWithoutFundingPaymentsInput = {
    update: XOR<MarketUpdateWithoutFundingPaymentsInput, MarketUncheckedUpdateWithoutFundingPaymentsInput>
    create: XOR<MarketCreateWithoutFundingPaymentsInput, MarketUncheckedCreateWithoutFundingPaymentsInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutFundingPaymentsInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutFundingPaymentsInput, MarketUncheckedUpdateWithoutFundingPaymentsInput>
  }

  export type MarketUpdateWithoutFundingPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutMarketNestedInput
    orders?: OrderUpdateManyWithoutMarketNestedInput
    trades?: TradeUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutFundingPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutMarketNestedInput
    orders?: OrderUncheckedUpdateManyWithoutMarketNestedInput
    trades?: TradeUncheckedUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUncheckedUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type PositionUpsertWithoutFundingPaymentsInput = {
    update: XOR<PositionUpdateWithoutFundingPaymentsInput, PositionUncheckedUpdateWithoutFundingPaymentsInput>
    create: XOR<PositionCreateWithoutFundingPaymentsInput, PositionUncheckedCreateWithoutFundingPaymentsInput>
    where?: PositionWhereInput
  }

  export type PositionUpdateToOneWithWhereWithoutFundingPaymentsInput = {
    where?: PositionWhereInput
    data: XOR<PositionUpdateWithoutFundingPaymentsInput, PositionUncheckedUpdateWithoutFundingPaymentsInput>
  }

  export type PositionUpdateWithoutFundingPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPositionsNestedInput
    market?: MarketUpdateOneRequiredWithoutPositionsNestedInput
    liquidation?: LiquidationUpdateOneWithoutPositionNestedInput
    trades?: TradeUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateWithoutFundingPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    liquidation?: LiquidationUncheckedUpdateOneWithoutPositionNestedInput
    trades?: TradeUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type PositionCreateWithoutLiquidationInput = {
    id: string
    positionAddress: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPositionsInput
    market: MarketCreateNestedOneWithoutPositionsInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutPositionInput
    trades?: TradeCreateNestedManyWithoutPositionInput
  }

  export type PositionUncheckedCreateWithoutLiquidationInput = {
    id: string
    positionAddress: string
    userId: string
    marketId: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutPositionInput
    trades?: TradeUncheckedCreateNestedManyWithoutPositionInput
  }

  export type PositionCreateOrConnectWithoutLiquidationInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutLiquidationInput, PositionUncheckedCreateWithoutLiquidationInput>
  }

  export type MarketCreateWithoutLiquidationsInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionCreateNestedManyWithoutMarketInput
    orders?: OrderCreateNestedManyWithoutMarketInput
    trades?: TradeCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutLiquidationsInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutMarketInput
    orders?: OrderUncheckedCreateNestedManyWithoutMarketInput
    trades?: TradeUncheckedCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutMarketInput
    priceHistory?: PriceHistoryUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutLiquidationsInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutLiquidationsInput, MarketUncheckedCreateWithoutLiquidationsInput>
  }

  export type PositionUpsertWithoutLiquidationInput = {
    update: XOR<PositionUpdateWithoutLiquidationInput, PositionUncheckedUpdateWithoutLiquidationInput>
    create: XOR<PositionCreateWithoutLiquidationInput, PositionUncheckedCreateWithoutLiquidationInput>
    where?: PositionWhereInput
  }

  export type PositionUpdateToOneWithWhereWithoutLiquidationInput = {
    where?: PositionWhereInput
    data: XOR<PositionUpdateWithoutLiquidationInput, PositionUncheckedUpdateWithoutLiquidationInput>
  }

  export type PositionUpdateWithoutLiquidationInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPositionsNestedInput
    market?: MarketUpdateOneRequiredWithoutPositionsNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutPositionNestedInput
    trades?: TradeUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateWithoutLiquidationInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutPositionNestedInput
    trades?: TradeUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type MarketUpsertWithoutLiquidationsInput = {
    update: XOR<MarketUpdateWithoutLiquidationsInput, MarketUncheckedUpdateWithoutLiquidationsInput>
    create: XOR<MarketCreateWithoutLiquidationsInput, MarketUncheckedCreateWithoutLiquidationsInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutLiquidationsInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutLiquidationsInput, MarketUncheckedUpdateWithoutLiquidationsInput>
  }

  export type MarketUpdateWithoutLiquidationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutMarketNestedInput
    orders?: OrderUpdateManyWithoutMarketNestedInput
    trades?: TradeUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutLiquidationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutMarketNestedInput
    orders?: OrderUncheckedUpdateManyWithoutMarketNestedInput
    trades?: TradeUncheckedUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutMarketNestedInput
    priceHistory?: PriceHistoryUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type MarketCreateWithoutPriceHistoryInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionCreateNestedManyWithoutMarketInput
    orders?: OrderCreateNestedManyWithoutMarketInput
    trades?: TradeCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutPriceHistoryInput = {
    id: string
    assetSymbol: string
    marketAddress: string
    baseAssetReserve: Decimal | DecimalJsLike | number | string
    quoteAssetReserve: Decimal | DecimalJsLike | number | string
    fundingRate: Decimal | DecimalJsLike | number | string
    lastFundingTs: bigint | number
    totalLongSize: Decimal | DecimalJsLike | number | string
    totalShortSize: Decimal | DecimalJsLike | number | string
    maxLeverage: number
    minMarginRatioBps: number
    feeBps: number
    isActive: boolean
    minPositionSize: Decimal | DecimalJsLike | number | string
    maxPriceImpactBps: number
    kFactor: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutMarketInput
    orders?: OrderUncheckedCreateNestedManyWithoutMarketInput
    trades?: TradeUncheckedCreateNestedManyWithoutMarketInput
    fundingPayments?: FundingPaymentUncheckedCreateNestedManyWithoutMarketInput
    liquidations?: LiquidationUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutPriceHistoryInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutPriceHistoryInput, MarketUncheckedCreateWithoutPriceHistoryInput>
  }

  export type MarketUpsertWithoutPriceHistoryInput = {
    update: XOR<MarketUpdateWithoutPriceHistoryInput, MarketUncheckedUpdateWithoutPriceHistoryInput>
    create: XOR<MarketCreateWithoutPriceHistoryInput, MarketUncheckedCreateWithoutPriceHistoryInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutPriceHistoryInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutPriceHistoryInput, MarketUncheckedUpdateWithoutPriceHistoryInput>
  }

  export type MarketUpdateWithoutPriceHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUpdateManyWithoutMarketNestedInput
    orders?: OrderUpdateManyWithoutMarketNestedInput
    trades?: TradeUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutPriceHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetSymbol?: StringFieldUpdateOperationsInput | string
    marketAddress?: StringFieldUpdateOperationsInput | string
    baseAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteAssetReserve?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fundingRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLongSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalShortSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxLeverage?: IntFieldUpdateOperationsInput | number
    minMarginRatioBps?: IntFieldUpdateOperationsInput | number
    feeBps?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    minPositionSize?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxPriceImpactBps?: IntFieldUpdateOperationsInput | number
    kFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutMarketNestedInput
    orders?: OrderUncheckedUpdateManyWithoutMarketNestedInput
    trades?: TradeUncheckedUpdateManyWithoutMarketNestedInput
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutMarketNestedInput
    liquidations?: LiquidationUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type PositionCreateManyUserInput = {
    id: string
    positionAddress: string
    marketId: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyUserInput = {
    id: string
    marketId: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
  }

  export type TradeCreateManyUserInput = {
    id: string
    orderId: string
    positionId: string
    marketId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type PositionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutPositionsNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutPositionNestedInput
    liquidation?: LiquidationUpdateOneWithoutPositionNestedInput
    trades?: TradeUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutPositionNestedInput
    liquidation?: LiquidationUncheckedUpdateOneWithoutPositionNestedInput
    trades?: TradeUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    market?: MarketUpdateOneRequiredWithoutOrdersNestedInput
    trades?: TradeUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    trades?: TradeUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TradeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutTradesNestedInput
    position?: PositionUpdateOneRequiredWithoutTradesNestedInput
    market?: MarketUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionCreateManyMarketInput = {
    id: string
    positionAddress: string
    userId: string
    isLong: boolean
    size: Decimal | DecimalJsLike | number | string
    entryPrice: Decimal | DecimalJsLike | number | string
    collateral: Decimal | DecimalJsLike | number | string
    leverage: number
    openedAt: bigint | number
    lastFundingTs: bigint | number
    realizedPnlFromFunding: Decimal | DecimalJsLike | number | string
    liquidationPrice: Decimal | DecimalJsLike | number | string
    isClosed?: boolean
    closedAt?: bigint | number | null
    closingPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyMarketInput = {
    id: string
    userId: string
    orderType: number
    isLong: boolean
    size: string
    price: string
    collateral: string
    leverage: number
    isActive?: boolean
    maxSlippageBps?: number
    createdAt: string
    positionId?: string | null
    executionPrice?: string | null
    executedAt?: string | null
    cancelledAt?: string | null
    txHash?: string | null
    lastError?: string | null
  }

  export type TradeCreateManyMarketInput = {
    id: string
    orderId: string
    positionId: string
    userId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type FundingPaymentCreateManyMarketInput = {
    id: string
    positionId: string
    amount: Decimal | DecimalJsLike | number | string
    rate: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    txHash?: string | null
    createdAt?: Date | string
  }

  export type LiquidationCreateManyMarketInput = {
    id: string
    positionId: string
    liquidator?: string | null
    liquidationPrice: Decimal | DecimalJsLike | number | string
    collateralReturned: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type PriceHistoryCreateManyMarketInput = {
    id?: string
    markPrice: Decimal | DecimalJsLike | number | string
    indexPrice: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type PositionUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPositionsNestedInput
    fundingPayments?: FundingPaymentUpdateManyWithoutPositionNestedInput
    liquidation?: LiquidationUpdateOneWithoutPositionNestedInput
    trades?: TradeUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fundingPayments?: FundingPaymentUncheckedUpdateManyWithoutPositionNestedInput
    liquidation?: LiquidationUncheckedUpdateOneWithoutPositionNestedInput
    trades?: TradeUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type PositionUncheckedUpdateManyWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionAddress?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    entryPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateral?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    leverage?: IntFieldUpdateOperationsInput | number
    openedAt?: BigIntFieldUpdateOperationsInput | bigint | number
    lastFundingTs?: BigIntFieldUpdateOperationsInput | bigint | number
    realizedPnlFromFunding?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    closedAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    closingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    trades?: TradeUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    trades?: TradeUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orderType?: IntFieldUpdateOperationsInput | number
    isLong?: BoolFieldUpdateOperationsInput | boolean
    size?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    collateral?: StringFieldUpdateOperationsInput | string
    leverage?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxSlippageBps?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    executionPrice?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TradeUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutTradesNestedInput
    position?: PositionUpdateOneRequiredWithoutTradesNestedInput
    user?: UserUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingPaymentUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    position?: PositionUpdateOneRequiredWithoutFundingPaymentsNestedInput
  }

  export type FundingPaymentUncheckedUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingPaymentUncheckedUpdateManyWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidationUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    liquidator?: NullableStringFieldUpdateOperationsInput | string | null
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    position?: PositionUpdateOneRequiredWithoutLiquidationNestedInput
  }

  export type LiquidationUncheckedUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    liquidator?: NullableStringFieldUpdateOperationsInput | string | null
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiquidationUncheckedUpdateManyWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    liquidator?: NullableStringFieldUpdateOperationsInput | string | null
    liquidationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    collateralReturned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    markPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryUncheckedUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    markPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryUncheckedUpdateManyWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    markPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    indexPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingPaymentCreateManyPositionInput = {
    id: string
    marketId: string
    amount: Decimal | DecimalJsLike | number | string
    rate: Decimal | DecimalJsLike | number | string
    timestamp: bigint | number
    txHash?: string | null
    createdAt?: Date | string
  }

  export type TradeCreateManyPositionInput = {
    id: string
    orderId: string
    userId: string
    marketId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type FundingPaymentUpdateWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutFundingPaymentsNestedInput
  }

  export type FundingPaymentUncheckedUpdateWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingPaymentUncheckedUpdateManyWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUpdateWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutTradesNestedInput
    market?: MarketUpdateOneRequiredWithoutTradesNestedInput
    user?: UserUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutPositionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyOrderInput = {
    id: string
    positionId: string
    userId: string
    marketId: string
    side: $Enums.OrderSide
    size: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    txHash: string
    createdAt?: Date | string
  }

  export type TradeUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    position?: PositionUpdateOneRequiredWithoutTradesNestedInput
    market?: MarketUpdateOneRequiredWithoutTradesNestedInput
    user?: UserUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    size?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    txHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}