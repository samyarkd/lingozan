// GENERATED by @edgedb/generate v0.5.3

import type * as edgedb from "edgedb";
export namespace std {
  export interface BaseObject {
    "id": string;
  }
  export interface $Object extends BaseObject {}
  export type Endian = "Little" | "Big";
  export interface FreeObject extends BaseObject {}
  export type JsonEmpty = "ReturnEmpty" | "ReturnTarget" | "Error" | "UseNull" | "DeleteKey";
  export namespace enc {
    export type Base64Alphabet = "standard" | "urlsafe";
  }
}
export namespace cfg {
  export interface ConfigObject extends std.BaseObject {}
  export interface AbstractConfig extends ConfigObject {
    "extensions": ExtensionConfig[];
    "session_idle_timeout": edgedb.Duration;
    "session_idle_transaction_timeout": edgedb.Duration;
    "query_execution_timeout": edgedb.Duration;
    "listen_port": number;
    "listen_addresses": string[];
    "auth": Auth[];
    "allow_dml_in_functions"?: boolean | null;
    "allow_bare_ddl"?: AllowBareDDL | null;
    "apply_access_policies"?: boolean | null;
    "allow_user_specified_id"?: boolean | null;
    "cors_allow_origins": string[];
    "auto_rebuild_query_cache"?: boolean | null;
    "query_cache_mode"?: QueryCacheMode | null;
    "shared_buffers"?: edgedb.ConfigMemory | null;
    "query_work_mem"?: edgedb.ConfigMemory | null;
    "maintenance_work_mem"?: edgedb.ConfigMemory | null;
    "effective_cache_size"?: edgedb.ConfigMemory | null;
    "effective_io_concurrency"?: number | null;
    "default_statistics_target"?: number | null;
    "force_database_error"?: string | null;
    "_pg_prepared_statement_cache_size": number;
  }
  export type AllowBareDDL = "AlwaysAllow" | "NeverAllow";
  export interface Auth extends ConfigObject {
    "priority": number;
    "user": string[];
    "method"?: AuthMethod | null;
    "comment"?: string | null;
  }
  export interface AuthMethod extends ConfigObject {
    "transports": ConnectionTransport[];
  }
  export interface DatabaseConfig extends AbstractConfig {}
  export interface BranchConfig extends DatabaseConfig {}
  export interface Config extends AbstractConfig {}
  export type ConnectionTransport = "TCP" | "TCP_PG" | "HTTP" | "SIMPLE_HTTP" | "HTTP_METRICS" | "HTTP_HEALTH";
  export interface ExtensionConfig extends ConfigObject {
    "cfg": AbstractConfig;
  }
  export interface InstanceConfig extends AbstractConfig {}
  export interface JWT extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface Password extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export type QueryCacheMode = "InMemory" | "RegInline" | "PgFunc" | "Default";
  export interface SCRAM extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface Trust extends AuthMethod {}
  export interface mTLS extends AuthMethod {
    "transports": ConnectionTransport[];
  }
}
export namespace $default {
  export interface AnsweredQuestion extends std.$Object {
    "question": Question;
    "isCorrect": boolean;
    "userAnswer": string;
    "takenQuiz": TakenQuiz;
  }
  export interface Question extends std.$Object {
    "tutorial": Tutorial;
    "correctAnswer": string;
    "title": string;
    "answers": string[];
    "answeredQuestions": AnsweredQuestion[];
  }
  export interface TakenQuiz extends std.$Object {
    "tutorial": Tutorial;
    "review"?: string | null;
    "answeredQuestions": AnsweredQuestion[];
  }
  export interface Tutorial extends std.$Object {
    "user": User;
    "phrase": string;
    "tutorialSteps": TutorialStep[];
    "translation": string;
    "tutorialQuestions": Question[];
    "takenQuizzes": TakenQuiz[];
  }
  export interface TutorialStep extends std.$Object {
    "body": string;
    "title": string;
    "tutorial": Tutorial;
  }
  export interface User extends std.$Object {
    "email"?: string | null;
    "name"?: string | null;
    "identity": ext.auth.Identity;
    "avatar_url"?: string | null;
    "tutorials": Tutorial[];
  }
  export interface current_user extends User {}
}
import AnsweredQuestion = $default.AnsweredQuestion;
import Question = $default.Question;
import TakenQuiz = $default.TakenQuiz;
import Tutorial = $default.Tutorial;
import TutorialStep = $default.TutorialStep;
import User = $default.User;
import current_user = $default.current_user;
export type {
  AnsweredQuestion,
  Question,
  TakenQuiz,
  Tutorial,
  TutorialStep,
  User,
  current_user
};
export namespace ext {
  export namespace auth {
    export interface ProviderConfig extends cfg.ConfigObject {
      "name": string;
    }
    export interface OAuthProviderConfig extends ProviderConfig {
      "name": string;
      "secret": string;
      "client_id": string;
      "display_name": string;
      "additional_scope"?: string | null;
    }
    export interface AppleOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export interface Auditable extends std.$Object {
      "created_at": Date;
      "modified_at": Date;
    }
    export interface AuthConfig extends cfg.ExtensionConfig {
      "providers": ProviderConfig[];
      "ui"?: UIConfig | null;
      "app_name"?: string | null;
      "logo_url"?: string | null;
      "dark_logo_url"?: string | null;
      "brand_color"?: string | null;
      "auth_signing_key"?: string | null;
      "token_time_to_live"?: edgedb.Duration | null;
      "allowed_redirect_urls": string[];
    }
    export interface AzureOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export interface Identity extends Auditable {
      "issuer": string;
      "subject": string;
    }
    export interface ClientTokenIdentity extends Identity {}
    export interface DiscordOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export interface Factor extends Auditable {
      "identity": LocalIdentity;
    }
    export interface EmailFactor extends Factor {
      "email": string;
      "verified_at"?: Date | null;
    }
    export interface EmailPasswordFactor extends EmailFactor {
      "email": string;
      "password_hash": string;
    }
    export interface EmailPasswordProviderConfig extends ProviderConfig {
      "name": string;
      "require_verification": boolean;
    }
    export type FlowType = "PKCE" | "Implicit";
    export interface GitHubOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export interface GoogleOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export type JWTAlgo = "RS256" | "HS256";
    export interface LocalIdentity extends Identity {
      "subject": string;
    }
    export interface MagicLinkFactor extends EmailFactor {
      "email": string;
    }
    export interface MagicLinkProviderConfig extends ProviderConfig {
      "name": string;
      "token_time_to_live": edgedb.Duration;
    }
    export interface PKCEChallenge extends Auditable {
      "challenge": string;
      "auth_token"?: string | null;
      "refresh_token"?: string | null;
      "identity"?: Identity | null;
    }
    export interface SMTPConfig extends cfg.ExtensionConfig {
      "sender"?: string | null;
      "host"?: string | null;
      "port"?: number | null;
      "username"?: string | null;
      "password"?: string | null;
      "security": SMTPSecurity;
      "validate_certs": boolean;
      "timeout_per_email": edgedb.Duration;
      "timeout_per_attempt": edgedb.Duration;
    }
    export type SMTPSecurity = "PlainText" | "TLS" | "STARTTLS" | "STARTTLSOrPlainText";
    export interface SlackOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export interface UIConfig extends cfg.ConfigObject {
      "redirect_to": string;
      "redirect_to_on_signup"?: string | null;
      "flow_type": FlowType;
      "app_name"?: string | null;
      "logo_url"?: string | null;
      "dark_logo_url"?: string | null;
      "brand_color"?: string | null;
    }
    export interface WebAuthnAuthenticationChallenge extends Auditable {
      "challenge": Uint8Array;
      "factors": WebAuthnFactor[];
    }
    export interface WebAuthnFactor extends EmailFactor {
      "user_handle": Uint8Array;
      "credential_id": Uint8Array;
      "public_key": Uint8Array;
    }
    export interface WebAuthnProviderConfig extends ProviderConfig {
      "name": string;
      "relying_party_origin": string;
      "require_verification": boolean;
    }
    export interface WebAuthnRegistrationChallenge extends Auditable {
      "challenge": Uint8Array;
      "email": string;
      "user_handle": Uint8Array;
    }
  }
}
export namespace fts {
  export type ElasticLanguage = "ara" | "bul" | "cat" | "ces" | "ckb" | "dan" | "deu" | "ell" | "eng" | "eus" | "fas" | "fin" | "fra" | "gle" | "glg" | "hin" | "hun" | "hye" | "ind" | "ita" | "lav" | "nld" | "nor" | "por" | "ron" | "rus" | "spa" | "swe" | "tha" | "tur" | "zho" | "edb_Brazilian" | "edb_ChineseJapaneseKorean";
  export type Language = "ara" | "hye" | "eus" | "cat" | "dan" | "nld" | "eng" | "fin" | "fra" | "deu" | "ell" | "hin" | "hun" | "ind" | "gle" | "ita" | "nor" | "por" | "ron" | "rus" | "spa" | "swe" | "tur";
  export type LuceneLanguage = "ara" | "ben" | "bul" | "cat" | "ces" | "ckb" | "dan" | "deu" | "ell" | "eng" | "est" | "eus" | "fas" | "fin" | "fra" | "gle" | "glg" | "hin" | "hun" | "hye" | "ind" | "ita" | "lav" | "lit" | "nld" | "nor" | "por" | "ron" | "rus" | "spa" | "srp" | "swe" | "tha" | "tur" | "edb_Brazilian" | "edb_ChineseJapaneseKorean" | "edb_Indian";
  export type PGLanguage = "xxx_simple" | "ara" | "hye" | "eus" | "cat" | "dan" | "nld" | "eng" | "fin" | "fra" | "deu" | "ell" | "hin" | "hun" | "ind" | "gle" | "ita" | "lit" | "npi" | "nor" | "por" | "ron" | "rus" | "srp" | "spa" | "swe" | "tam" | "tur" | "yid";
  export type Weight = "A" | "B" | "C" | "D";
}
export namespace schema {
  export type AccessKind = "Select" | "UpdateRead" | "UpdateWrite" | "Delete" | "Insert";
  export interface $Object extends std.BaseObject {
    "name": string;
    "internal": boolean;
    "builtin": boolean;
    "computed_fields"?: string[] | null;
  }
  export interface SubclassableObject extends $Object {
    "abstract"?: boolean | null;
    "is_abstract"?: boolean | null;
    "final": boolean;
    "is_final": boolean;
  }
  export interface InheritingObject extends SubclassableObject {
    "bases": InheritingObject[];
    "ancestors": InheritingObject[];
    "inherited_fields"?: string[] | null;
  }
  export interface AnnotationSubject extends $Object {
    "annotations": Annotation[];
  }
  export interface AccessPolicy extends InheritingObject, AnnotationSubject {
    "subject": ObjectType;
    "access_kinds": AccessKind[];
    "condition"?: string | null;
    "action": AccessPolicyAction;
    "expr"?: string | null;
    "errmessage"?: string | null;
  }
  export type AccessPolicyAction = "Allow" | "Deny";
  export interface Alias extends AnnotationSubject {
    "expr": string;
    "type"?: Type | null;
  }
  export interface Annotation extends InheritingObject, AnnotationSubject {
    "inheritable"?: boolean | null;
  }
  export interface Type extends SubclassableObject, AnnotationSubject {
    "expr"?: string | null;
    "from_alias"?: boolean | null;
    "is_from_alias"?: boolean | null;
  }
  export interface PrimitiveType extends Type {}
  export interface CollectionType extends PrimitiveType {}
  export interface Array extends CollectionType {
    "element_type": Type;
    "dimensions"?: number[] | null;
  }
  export interface ArrayExprAlias extends Array {}
  export interface CallableObject extends AnnotationSubject {
    "params": Parameter[];
    "return_type"?: Type | null;
    "return_typemod"?: TypeModifier | null;
  }
  export type Cardinality = "One" | "Many";
  export interface VolatilitySubject extends $Object {
    "volatility"?: Volatility | null;
  }
  export interface Cast extends AnnotationSubject, VolatilitySubject {
    "from_type"?: Type | null;
    "to_type"?: Type | null;
    "allow_implicit"?: boolean | null;
    "allow_assignment"?: boolean | null;
  }
  export interface ConsistencySubject extends InheritingObject, AnnotationSubject {
    "constraints": Constraint[];
  }
  export interface Constraint extends CallableObject, InheritingObject {
    "params": Parameter[];
    "expr"?: string | null;
    "subjectexpr"?: string | null;
    "finalexpr"?: string | null;
    "errmessage"?: string | null;
    "delegated"?: boolean | null;
    "except_expr"?: string | null;
    "subject"?: ConsistencySubject | null;
  }
  export interface Delta extends $Object {
    "parents": Delta[];
  }
  export interface Extension extends AnnotationSubject, $Object {
    "package": sys.ExtensionPackage;
  }
  export interface Function extends CallableObject, VolatilitySubject {
    "preserves_optionality"?: boolean | null;
    "body"?: string | null;
    "language": string;
    "used_globals": Global[];
  }
  export interface FutureBehavior extends $Object {}
  export interface Global extends AnnotationSubject {
    "target"?: Type | null;
    "required"?: boolean | null;
    "cardinality"?: Cardinality | null;
    "expr"?: string | null;
    "default"?: string | null;
  }
  export interface Index extends InheritingObject, AnnotationSubject {
    "expr"?: string | null;
    "except_expr"?: string | null;
    "params": Parameter[];
    "kwargs"?: {name: string, expr: string}[] | null;
  }
  export interface Pointer extends ConsistencySubject, AnnotationSubject {
    "cardinality"?: Cardinality | null;
    "required"?: boolean | null;
    "readonly"?: boolean | null;
    "default"?: string | null;
    "expr"?: string | null;
    "secret"?: boolean | null;
    "source"?: Source | null;
    "target"?: Type | null;
    "rewrites": Rewrite[];
  }
  export interface Source extends $Object {
    "indexes": Index[];
    "pointers": Pointer[];
  }
  export interface Link extends Pointer, Source {
    "target"?: ObjectType | null;
    "properties": Property[];
    "on_target_delete"?: TargetDeleteAction | null;
    "on_source_delete"?: SourceDeleteAction | null;
  }
  export interface Migration extends AnnotationSubject, $Object {
    "parents": Migration[];
    "script": string;
    "message"?: string | null;
    "generated_by"?: MigrationGeneratedBy | null;
  }
  export type MigrationGeneratedBy = "DevMode" | "DDLStatement";
  export interface Module extends AnnotationSubject, $Object {}
  export interface MultiRange extends CollectionType {
    "element_type": Type;
  }
  export interface MultiRangeExprAlias extends MultiRange {}
  export interface ObjectType extends Source, ConsistencySubject, InheritingObject, Type, AnnotationSubject {
    "union_of": ObjectType[];
    "intersection_of": ObjectType[];
    "access_policies": AccessPolicy[];
    "triggers": Trigger[];
    "compound_type": boolean;
    "is_compound_type": boolean;
    "links": Link[];
    "properties": Property[];
  }
  export interface Operator extends CallableObject, VolatilitySubject {
    "operator_kind"?: OperatorKind | null;
    "abstract"?: boolean | null;
    "is_abstract"?: boolean | null;
  }
  export type OperatorKind = "Infix" | "Postfix" | "Prefix" | "Ternary";
  export interface Parameter extends $Object {
    "type": Type;
    "typemod": TypeModifier;
    "kind": ParameterKind;
    "num": number;
    "default"?: string | null;
  }
  export type ParameterKind = "VariadicParam" | "NamedOnlyParam" | "PositionalParam";
  export interface Property extends Pointer {}
  export interface PseudoType extends InheritingObject, Type {}
  export interface Range extends CollectionType {
    "element_type": Type;
  }
  export interface RangeExprAlias extends Range {}
  export interface Rewrite extends InheritingObject, AnnotationSubject {
    "subject": Pointer;
    "kind": TriggerKind;
    "expr": string;
  }
  export type RewriteKind = "Update" | "Insert";
  export interface ScalarType extends PrimitiveType, ConsistencySubject, AnnotationSubject {
    "default"?: string | null;
    "enum_values"?: string[] | null;
    "arg_values"?: string[] | null;
  }
  export type SourceDeleteAction = "DeleteTarget" | "Allow" | "DeleteTargetIfOrphan";
  export type TargetDeleteAction = "Restrict" | "DeleteSource" | "Allow" | "DeferredRestrict";
  export interface Trigger extends InheritingObject, AnnotationSubject {
    "subject": ObjectType;
    "timing": TriggerTiming;
    "kinds": TriggerKind[];
    "scope": TriggerScope;
    "expr"?: string | null;
    "condition"?: string | null;
  }
  export type TriggerKind = "Update" | "Delete" | "Insert";
  export type TriggerScope = "All" | "Each";
  export type TriggerTiming = "After" | "AfterCommitOf";
  export interface Tuple extends CollectionType {
    "named": boolean;
    "element_types": TupleElement[];
  }
  export interface TupleElement extends std.BaseObject {
    "type": Type;
    "name"?: string | null;
  }
  export interface TupleExprAlias extends Tuple {}
  export type TypeModifier = "SetOfType" | "OptionalType" | "SingletonType";
  export type Volatility = "Immutable" | "Stable" | "Volatile";
}
export namespace sys {
  export interface SystemObject extends schema.$Object {}
  export interface ExternalObject extends SystemObject {}
  export interface Database extends ExternalObject, schema.AnnotationSubject {
    "name": string;
  }
  export interface ExtensionPackage extends SystemObject, schema.AnnotationSubject {
    "script": string;
    "version": {major: number, minor: number, stage: VersionStage, stage_no: number, local: string[]};
  }
  export interface Role extends SystemObject, schema.InheritingObject, schema.AnnotationSubject {
    "name": string;
    "superuser": boolean;
    "is_superuser": boolean;
    "password"?: string | null;
    "member_of": Role[];
  }
  export type TransactionIsolation = "RepeatableRead" | "Serializable";
  export type VersionStage = "dev" | "alpha" | "beta" | "rc" | "final";
}
export interface types {
  "std": {
    "BaseObject": std.BaseObject;
    "Object": std.$Object;
    "Endian": std.Endian;
    "FreeObject": std.FreeObject;
    "JsonEmpty": std.JsonEmpty;
    "enc": {
      "Base64Alphabet": std.enc.Base64Alphabet;
    };
  };
  "cfg": {
    "ConfigObject": cfg.ConfigObject;
    "AbstractConfig": cfg.AbstractConfig;
    "AllowBareDDL": cfg.AllowBareDDL;
    "Auth": cfg.Auth;
    "AuthMethod": cfg.AuthMethod;
    "DatabaseConfig": cfg.DatabaseConfig;
    "BranchConfig": cfg.BranchConfig;
    "Config": cfg.Config;
    "ConnectionTransport": cfg.ConnectionTransport;
    "ExtensionConfig": cfg.ExtensionConfig;
    "InstanceConfig": cfg.InstanceConfig;
    "JWT": cfg.JWT;
    "Password": cfg.Password;
    "QueryCacheMode": cfg.QueryCacheMode;
    "SCRAM": cfg.SCRAM;
    "Trust": cfg.Trust;
    "mTLS": cfg.mTLS;
  };
  "default": {
    "AnsweredQuestion": $default.AnsweredQuestion;
    "Question": $default.Question;
    "TakenQuiz": $default.TakenQuiz;
    "Tutorial": $default.Tutorial;
    "TutorialStep": $default.TutorialStep;
    "User": $default.User;
    "current_user": $default.current_user;
  };
  "ext": {
    "auth": {
      "ProviderConfig": ext.auth.ProviderConfig;
      "OAuthProviderConfig": ext.auth.OAuthProviderConfig;
      "AppleOAuthProvider": ext.auth.AppleOAuthProvider;
      "Auditable": ext.auth.Auditable;
      "AuthConfig": ext.auth.AuthConfig;
      "AzureOAuthProvider": ext.auth.AzureOAuthProvider;
      "Identity": ext.auth.Identity;
      "ClientTokenIdentity": ext.auth.ClientTokenIdentity;
      "DiscordOAuthProvider": ext.auth.DiscordOAuthProvider;
      "Factor": ext.auth.Factor;
      "EmailFactor": ext.auth.EmailFactor;
      "EmailPasswordFactor": ext.auth.EmailPasswordFactor;
      "EmailPasswordProviderConfig": ext.auth.EmailPasswordProviderConfig;
      "FlowType": ext.auth.FlowType;
      "GitHubOAuthProvider": ext.auth.GitHubOAuthProvider;
      "GoogleOAuthProvider": ext.auth.GoogleOAuthProvider;
      "JWTAlgo": ext.auth.JWTAlgo;
      "LocalIdentity": ext.auth.LocalIdentity;
      "MagicLinkFactor": ext.auth.MagicLinkFactor;
      "MagicLinkProviderConfig": ext.auth.MagicLinkProviderConfig;
      "PKCEChallenge": ext.auth.PKCEChallenge;
      "SMTPConfig": ext.auth.SMTPConfig;
      "SMTPSecurity": ext.auth.SMTPSecurity;
      "SlackOAuthProvider": ext.auth.SlackOAuthProvider;
      "UIConfig": ext.auth.UIConfig;
      "WebAuthnAuthenticationChallenge": ext.auth.WebAuthnAuthenticationChallenge;
      "WebAuthnFactor": ext.auth.WebAuthnFactor;
      "WebAuthnProviderConfig": ext.auth.WebAuthnProviderConfig;
      "WebAuthnRegistrationChallenge": ext.auth.WebAuthnRegistrationChallenge;
    };
  };
  "fts": {
    "ElasticLanguage": fts.ElasticLanguage;
    "Language": fts.Language;
    "LuceneLanguage": fts.LuceneLanguage;
    "PGLanguage": fts.PGLanguage;
    "Weight": fts.Weight;
  };
  "schema": {
    "AccessKind": schema.AccessKind;
    "Object": schema.$Object;
    "SubclassableObject": schema.SubclassableObject;
    "InheritingObject": schema.InheritingObject;
    "AnnotationSubject": schema.AnnotationSubject;
    "AccessPolicy": schema.AccessPolicy;
    "AccessPolicyAction": schema.AccessPolicyAction;
    "Alias": schema.Alias;
    "Annotation": schema.Annotation;
    "Type": schema.Type;
    "PrimitiveType": schema.PrimitiveType;
    "CollectionType": schema.CollectionType;
    "Array": schema.Array;
    "ArrayExprAlias": schema.ArrayExprAlias;
    "CallableObject": schema.CallableObject;
    "Cardinality": schema.Cardinality;
    "VolatilitySubject": schema.VolatilitySubject;
    "Cast": schema.Cast;
    "ConsistencySubject": schema.ConsistencySubject;
    "Constraint": schema.Constraint;
    "Delta": schema.Delta;
    "Extension": schema.Extension;
    "Function": schema.Function;
    "FutureBehavior": schema.FutureBehavior;
    "Global": schema.Global;
    "Index": schema.Index;
    "Pointer": schema.Pointer;
    "Source": schema.Source;
    "Link": schema.Link;
    "Migration": schema.Migration;
    "MigrationGeneratedBy": schema.MigrationGeneratedBy;
    "Module": schema.Module;
    "MultiRange": schema.MultiRange;
    "MultiRangeExprAlias": schema.MultiRangeExprAlias;
    "ObjectType": schema.ObjectType;
    "Operator": schema.Operator;
    "OperatorKind": schema.OperatorKind;
    "Parameter": schema.Parameter;
    "ParameterKind": schema.ParameterKind;
    "Property": schema.Property;
    "PseudoType": schema.PseudoType;
    "Range": schema.Range;
    "RangeExprAlias": schema.RangeExprAlias;
    "Rewrite": schema.Rewrite;
    "RewriteKind": schema.RewriteKind;
    "ScalarType": schema.ScalarType;
    "SourceDeleteAction": schema.SourceDeleteAction;
    "TargetDeleteAction": schema.TargetDeleteAction;
    "Trigger": schema.Trigger;
    "TriggerKind": schema.TriggerKind;
    "TriggerScope": schema.TriggerScope;
    "TriggerTiming": schema.TriggerTiming;
    "Tuple": schema.Tuple;
    "TupleElement": schema.TupleElement;
    "TupleExprAlias": schema.TupleExprAlias;
    "TypeModifier": schema.TypeModifier;
    "Volatility": schema.Volatility;
  };
  "sys": {
    "SystemObject": sys.SystemObject;
    "ExternalObject": sys.ExternalObject;
    "Database": sys.Database;
    "ExtensionPackage": sys.ExtensionPackage;
    "Role": sys.Role;
    "TransactionIsolation": sys.TransactionIsolation;
    "VersionStage": sys.VersionStage;
  };
}


export namespace helper {
  type LinkType = std.BaseObject | std.BaseObject[];

  export type propertyKeys<T> = {
    [k in keyof T]: NonNullable<T[k]> extends LinkType ? never : k;
  }[keyof T];

  export type linkKeys<T> = {
    [k in keyof T]: NonNullable<T[k]> extends LinkType ? k : never;
  }[keyof T];

  export type Props<T> = Pick<T, propertyKeys<T>>;
  export type Links<T> = Pick<T, linkKeys<T>>;
}
