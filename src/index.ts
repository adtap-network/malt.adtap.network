import MaltInterface from './interfaces/malt';
import AccountMaltInterface from './interfaces/malts/account';
import AgentMaltInterface from './interfaces/malts/agent';
import BlockMaltInterface from './interfaces/malts/block';
import ErrorsMaltInterface from './interfaces/malts/errors';
import FaultMaltInterface from './interfaces/malts/fault';
import FiltersMaltInterface from './interfaces/malts/filters';
import JsonMaltInterface from './interfaces/malts/json';
import KeysMaltInterface from './interfaces/malts/keys';
import MailerMaltInterface from './interfaces/malts/mailer';
import MessageMaltInterface from './interfaces/malts/message';
import ParamsMaltInterface from './interfaces/malts/params';
import QueryMaltInterface from './interfaces/malts/query';
import RouteMaltInterface from './interfaces/malts/route';
import SectionMaltInterface from './interfaces/malts/section';

export {
    MaltInterface, AccountMaltInterface, AgentMaltInterface,
    BlockMaltInterface, ErrorsMaltInterface, FaultMaltInterface,
    FiltersMaltInterface, JsonMaltInterface, KeysMaltInterface,
    MailerMaltInterface, MessageMaltInterface, ParamsMaltInterface,
    QueryMaltInterface, RouteMaltInterface, SectionMaltInterface
};

import Malt from './classes/malt';
import AccountMalt from './classes/malts/account';
import AgentMalt from './classes/malts/agent';
import AnalyticMalt from './classes/malts/analytic';
import AnalyticsMalt from './classes/malts/analytics';
import BidMalt from './classes/malts/bid';
import BlockMalt from './classes/malts/block';
import BookMalt from './classes/malts/book';
import ChartMalt from './classes/malts/chart';
import ClaimableMalt from './classes/malts/claimable';
import CoinMalt from './classes/malts/coin';
import ErrorsMalt from './classes/malts/errors';
import ExtensionsMalt from './classes/malts/extensions';
import FaultMalt from './classes/malts/fault';
import FiltersMalt from './classes/malts/filters';
import JsonMalt from './classes/malts/json';
import KeysMalt from './classes/malts/keys';
import LayoutMalt from './classes/malts/layout';
import MailerMalt from './classes/malts/mailer';
import MessageMalt from './classes/malts/message';
import MimesMalt from './classes/malts/mimes';
import ParamsMalt from './classes/malts/params';
import QueryMalt from './classes/malts/query';
import RouteMalt from './classes/malts/route';
import SectionMalt from './classes/malts/section'
import ShareMalt from './classes/malts/share';
import TradeMalt from './classes/malts/trade';

export {
    Malt, AccountMalt, AgentMalt, AnalyticMalt,
    AnalyticsMalt, BidMalt, BlockMalt, BookMalt,
    ChartMalt, ClaimableMalt, CoinMalt, ErrorsMalt,
    ExtensionsMalt, FaultMalt, FiltersMalt, JsonMalt,
    KeysMalt, LayoutMalt, MailerMalt, MessageMalt,
    MimesMalt, ParamsMalt, QueryMalt, RouteMalt,
    SectionMalt, ShareMalt, TradeMalt
}